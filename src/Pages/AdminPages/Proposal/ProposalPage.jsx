import { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import { HiOutlineDocumentText, HiOutlineDownload } from "react-icons/hi";
// TODO: change this path/extension to wherever Food2GoLogo lives in your project
import logoSrc from "../../../../public/Images/Food2goLogo.jpg";

const products = [
  { value: "kitchen-web", label: "Kitchen (Web)", labelAr: "المطبخ (ويب)" },
  { value: "captain-order-app", label: "Captain Order (App)", labelAr: "طلبات الكابتن (تطبيق)" },
  { value: "pos-desktop", label: "POS (Desktop App)", labelAr: "نقاط البيع (تطبيق سطح المكتب)" },
  { value: "pos-app", label: "POS (App)", labelAr: "نقاط البيع (تطبيق)" },
  { value: "pos-web", label: "POS (Web)", labelAr: "نقاط البيع (ويب)" },
  { value: "user-app", label: "User (App)", labelAr: "مستخدم (تطبيق)" },
  { value: "user-web", label: "User (Web)", labelAr: "مستخدم (ويب)" },

];

// Text used inside the proposal document itself (preview + PDF)
const translations = {
  en: {
    dir: "ltr",
    locale: "en-US",
    currency: "EGP",
    sales: "Food2Go | Sales",
    title: "Financial Proposal",
    subtitle: "A tailored solution for your business",
    commercialOffer: "COMMERCIAL OFFER",
    preparedFor: "Prepared for",
    intro:
      "Food2Go is pleased to present this financial proposal, tailored to your business needs and covering the products and services listed below.",
    brand: "Brand",
    venueOwner: "Venue Owner",
    startDate: "Start Date",
    validUntil: "Valid Until",
    scope: "Scope of Services",
    productService: "Product / Service",
    status: "Status",
    included: "Included",
    total: "Total Proposal Value",
    validThrough: "Valid through",
    notes: "Notes",
    terms: "Terms & Conditions",
    termsList: [
      "All prices are quoted in Egyptian Pounds (EGP).",
      "This proposal is valid for the period stated above.",
      "The final scope and terms are confirmed upon signing the agreement.",
    ],
    repOurs: "Food2Go Representative",
    repClient: "Client Acceptance",
    thanks: "Thank you for choosing Food2Go.",
    footer: "FOOD2GO  |  FINANCIAL PROPOSAL",
    page: "Page",
  },
  ar: {
    dir: "rtl",
    locale: "ar-EG",
    currency: "ج.م",
    sales: "Food2Go | المبيعات",
    title: "عرض مالي",
    subtitle: "حل مصمم خصيصًا لنشاطك التجاري",
    commercialOffer: "عرض تجاري",
    preparedFor: "مُعَد لـ",
    intro:
      "يسعد Food2Go أن يقدم لكم هذا العرض المالي، المصمم وفقًا لاحتياجات نشاطكم التجاري، ويشمل المنتجات والخدمات المذكورة أدناه.",
    brand: "العلامة التجارية",
    venueOwner: "مالك المكان",
    startDate: "تاريخ البداية",
    validUntil: "ساري حتى",
    scope: "نطاق الخدمات",
    productService: "المنتج / الخدمة",
    status: "الحالة",
    included: "مشمول",
    total: "إجمالي قيمة العرض",
    validThrough: "ساري حتى",
    notes: "ملاحظات",
    terms: "الشروط والأحكام",
    termsList: [
      "جميع الأسعار بالجنيه المصري (EGP).",
      "هذا العرض ساري خلال الفترة المذكورة أعلاه.",
      "يتم تأكيد النطاق النهائي والشروط عند توقيع الاتفاقية.",
    ],
    repOurs: "ممثل Food2Go",
    repClient: "موافقة العميل",
    thanks: "شكرًا لاختياركم Food2Go.",
    footer: "FOOD2GO  |  عرض مالي",
    page: "صفحة",
  },
};

const initialForm = {
  language: "en",
  fromDate: "",
  toDate: "",
  price: "",
  brandName: "",
  ownerName: "",
  note: "",
};

const arabicPattern = /[\u0600-\u06FF]/;

// jsPDF's built-in fonts can't draw Arabic, so those proposals are captured from the
// on-screen preview (html2canvas) and saved as a PDF instead.
const needsBrowserPdf = (proposal) =>
  proposal.language === "ar" ||
  arabicPattern.test(`${proposal.brandName} ${proposal.ownerName} ${proposal.note}`);

const formatDate = (date, locale = "en-US") =>
  new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));

const formatPrice = (price, locale = "en-US") =>
  new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(price));

// Accent bar on the side the text starts from (left in LTR, right in RTL)
const sideBar = "border-l-2 pl-4 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-4";

const inputClass =
  "rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-mainColor focus:ring-2 focus:ring-mainColor/10";

// Loads the logo as a data URL so jsPDF can embed it (returns null if it can't be loaded)
const loadLogo = () =>
  new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      const width = image.naturalWidth || 300;
      const height = image.naturalHeight || 100;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(image, 0, 0, width, height);
      resolve({ dataUrl: canvas.toDataURL("image/png"), ratio: width / height });
    };
    image.onerror = () => resolve(null);
    image.src = logoSrc;
  });

const getFileName = (brandName) =>
  `Food2Go-Proposal-${brandName.trim().replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "client"}.pdf`;

const ProposalPage = () => {
  const proposalRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [proposal, setProposal] = useState(null);
  const [productsError, setProductsError] = useState("");
  const [downloadError, setDownloadError] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleProductChange = (event) => {
    const { checked, value } = event.target;
    setSelectedProducts((currentProducts) =>
      checked
        ? [...currentProducts, value]
        : currentProducts.filter((product) => product !== value)
    );
    setProductsError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedProducts.length) {
      setProductsError("Please select at least one product.");
      return;
    }

    setProductsError("");
    setProposal({
      ...form,
      products: products.filter(({ value }) => selectedProducts.includes(value)),
    });
  };

  // Used for Arabic proposals: captures the preview exactly as shown and saves it as a PDF
  const downloadPreviewAsPdf = async () => {
    const element = proposalRef.current;
    if (!element) {
      throw new Error("Proposal preview not found");
    }

    const { default: html2canvas } = await import("html2canvas");
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
      // Letter-spacing makes html2canvas draw letters one by one, which breaks Arabic joining
      onclone: (clonedDocument) => {
        clonedDocument
          .querySelectorAll(".proposal-document, .proposal-document *")
          .forEach((node) => {
            node.style.letterSpacing = "normal";
          });
      },
    });

    const pdf = new jsPDF({ unit: "mm", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const fullHeight = (canvas.height * pageWidth) / canvas.width;

    if (fullHeight <= pageHeight * 1.25) {
      // Fits (or almost fits) on one page: scale down slightly if needed and center it
      const scale = fullHeight > pageHeight ? pageHeight / fullHeight : 1;
      const width = pageWidth * scale;
      pdf.addImage(
        canvas.toDataURL("image/jpeg", 0.95),
        "JPEG",
        (pageWidth - width) / 2,
        0,
        width,
        fullHeight * scale
      );
    } else {
      // Long proposal: split into A4 pages
      const pxPerMm = canvas.width / pageWidth;
      const pageHeightPx = Math.floor(pageHeight * pxPerMm);
      let offset = 0;
      while (offset < canvas.height) {
        const sliceHeight = Math.min(pageHeightPx, canvas.height - offset);
        const slice = document.createElement("canvas");
        slice.width = canvas.width;
        slice.height = sliceHeight;
        slice
          .getContext("2d")
          .drawImage(canvas, 0, offset, canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight);
        if (offset > 0) {
          pdf.addPage();
        }
        pdf.addImage(slice.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, pageWidth, sliceHeight / pxPerMm);
        offset += sliceHeight;
      }
    }

    pdf.save(getFileName(proposal.brandName));
  };

  const handleDownloadPdf = async () => {
    if (!proposal || isDownloading) {
      return;
    }

    setDownloadError("");

    if (needsBrowserPdf(proposal)) {
      setIsDownloading(true);
      try {
        await downloadPreviewAsPdf();
      } catch (error) {
        console.error("Failed to generate proposal PDF:", error);
        setDownloadError("The PDF could not be generated. Please try again.");
      } finally {
        setIsDownloading(false);
      }
      return;
    }

    try {
      const logo = await loadLogo();
      const tr = translations.en;
      const note = proposal.note.trim();
      const pdf = new jsPDF({ unit: "mm", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 18;
      const accent = [158, 9, 15];
      const dark = [35, 39, 47];
      const muted = [112, 119, 130];
      const light = [247, 248, 250];
      const right = pageWidth - margin;
      const contentWidth = pageWidth - margin * 2;
      const bottomLimit = 266;
      let y = 0;

      const ensureSpace = (height) => {
        if (y + height > bottomLimit) {
          pdf.addPage();
          y = margin;
        }
      };

      const sectionTitle = (text) => {
        ensureSpace(14);
        pdf.setTextColor(...dark);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(12);
        pdf.text(text.toUpperCase(), margin, y);
        y += 7;
      };

      pdf.setProperties({
        title: `${tr.title} - ${proposal.brandName}`,
        subject: "Food2Go financial proposal",
        author: "Food2Go",
      });

      // Header band
      pdf.setFillColor(...accent);
      pdf.rect(0, 0, pageWidth, 54, "F");
      pdf.setTextColor(255, 255, 255);
      pdf.setFont("helvetica", "bold");
      if (logo) {
        // Logo on a white badge so it stays visible on the red header
        const logoHeight = 10;
        const logoWidth = logoHeight * logo.ratio;
        pdf.setFillColor(255, 255, 255);
        pdf.roundedRect(margin, 8, logoWidth + 6, logoHeight + 5, 2, 2, "F");
        pdf.addImage(logo.dataUrl, "PNG", margin + 3, 10.5, logoWidth, logoHeight);
      } else {
        pdf.setFontSize(10);
        pdf.text("FOOD2GO", margin, 15);
      }
      pdf.setFontSize(22);
      pdf.text(tr.title.toUpperCase(), margin, 35);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.text(tr.subtitle, margin, 44);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9);
      pdf.text(tr.commercialOffer, right, 16, { align: "right" });

      // Prepared for
      pdf.setTextColor(...dark);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      pdf.text(tr.preparedFor.toUpperCase(), margin, 70);

      const detailsTop = 77;
      const detailsHeight = 43;
      pdf.setFillColor(...light);
      pdf.roundedRect(margin, detailsTop, contentWidth, detailsHeight, 3, 3, "F");
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.setTextColor(...muted);
      pdf.text(tr.brand.toUpperCase(), margin + 7, detailsTop + 11);
      pdf.text(tr.venueOwner.toUpperCase(), margin + 7, detailsTop + 29);
      pdf.text(tr.startDate.toUpperCase(), margin + 94, detailsTop + 11);
      pdf.text(tr.validUntil.toUpperCase(), margin + 94, detailsTop + 29);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.setTextColor(...dark);
      pdf.text(proposal.brandName, margin + 7, detailsTop + 17);
      pdf.text(proposal.ownerName, margin + 7, detailsTop + 35);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.text(formatDate(proposal.fromDate, tr.locale), margin + 94, detailsTop + 17);
      pdf.text(formatDate(proposal.toDate, tr.locale), margin + 94, detailsTop + 35);

      // Intro
      y = detailsTop + detailsHeight + 10;
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9.5);
      pdf.setTextColor(...muted);
      const introLines = pdf.splitTextToSize(tr.intro, contentWidth);
      pdf.text(introLines, margin, y);
      y += introLines.length * 5 + 10;

      // Scope of services
      sectionTitle(tr.scope);
      ensureSpace(22);
      pdf.setFillColor(...accent);
      pdf.roundedRect(margin, y, contentWidth, 11, 2, 2, "F");
      pdf.setTextColor(255, 255, 255);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(8);
      pdf.text(tr.productService.toUpperCase(), margin + 5, y + 7);
      pdf.text(tr.status.toUpperCase(), right - 5, y + 7, { align: "right" });
      y += 11;

      proposal.products.forEach((product, index) => {
        ensureSpace(11);
        if (index % 2 === 0) {
          pdf.setFillColor(250, 250, 251);
          pdf.rect(margin, y, contentWidth, 11, "F");
        }
        pdf.setTextColor(...dark);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9);
        pdf.text(product.label, margin + 5, y + 7);
        pdf.setTextColor(...accent);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(8);
        pdf.text(tr.included.toUpperCase(), right - 5, y + 7, { align: "right" });
        y += 11;
      });

      // Total
      y += 10;
      ensureSpace(25);
      pdf.setFillColor(252, 242, 243);
      pdf.roundedRect(margin, y, contentWidth, 25, 3, 3, "F");
      pdf.setTextColor(...dark);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.text(tr.total.toUpperCase(), margin + 7, y + 11);
      pdf.setTextColor(...muted);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.text(`${tr.validThrough} ${formatDate(proposal.toDate, tr.locale)}`, margin + 7, y + 18);
      pdf.setTextColor(...accent);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(16);
      pdf.text(`${formatPrice(proposal.price, tr.locale)} ${tr.currency}`, right - 7, y + 16, {
        align: "right",
      });
      y += 25;

      // Notes
      if (note) {
        y += 10;
        sectionTitle(tr.notes);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9);
        pdf.setTextColor(...dark);
        pdf.splitTextToSize(note, contentWidth).forEach((line) => {
          ensureSpace(5);
          pdf.text(line, margin, y);
          y += 5;
        });
      }

      // Terms & conditions
      y += 10;
      sectionTitle(tr.terms);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8.5);
      pdf.setTextColor(...muted);
      tr.termsList.forEach((term, index) => {
        pdf.splitTextToSize(`${index + 1}. ${term}`, contentWidth).forEach((line) => {
          ensureSpace(5);
          pdf.text(line, margin, y);
          y += 4.8;
        });
        y += 1.5;
      });

      // Signatures
      y += 12;
      ensureSpace(26);
      const signatureWidth = (contentWidth - 20) / 2;
      pdf.setDrawColor(...muted);
      pdf.line(margin, y + 12, margin + signatureWidth, y + 12);
      pdf.line(right - signatureWidth, y + 12, right, y + 12);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.setTextColor(...muted);
      pdf.text(tr.repOurs, margin, y + 17);
      pdf.text(tr.repClient, right - signatureWidth, y + 17);

      // Footer on every page
      const totalPages = pdf.getNumberOfPages();
      for (let page = 1; page <= totalPages; page += 1) {
        pdf.setPage(page);
        pdf.setDrawColor(225, 228, 232);
        pdf.line(margin, 273, right, 273);
        pdf.setTextColor(...muted);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8);
        pdf.text(tr.thanks, margin, 281);
        pdf.text(`${tr.page} ${page} / ${totalPages}`, pageWidth / 2, 281, { align: "center" });
        pdf.text(tr.footer, right, 281, { align: "right" });
      }

      pdf.save(getFileName(proposal.brandName));
    } catch (error) {
      console.error("Failed to generate proposal PDF:", error);
      setDownloadError("The PDF could not be generated. Please try again.");
    }
  };

  const tr = proposal ? translations[proposal.language] || translations.en : translations.en;
  const isArabic = proposal?.language === "ar";
  const proposalNote = proposal?.note.trim();

  return (
    <main className="proposal-page min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8" dir="ltr">
      <header className="mb-8 rounded-2xl bg-gradient-to-r from-mainColor to-[#6f080c] p-6 text-white shadow-lg sm:p-8">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/15">
            <HiOutlineDocumentText className="h-7 w-7" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Food2Go | Sales</p>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Financial Proposal</h1>
            <p className="mt-2 text-sm text-white/80">
              Create a polished offer for your client and download it as a PDF.
            </p>
          </div>
        </div>
      </header>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
      >
        <div className="mb-6 border-b border-slate-100 pb-4">
          <h2 className="text-lg font-bold text-slate-800">Proposal Details</h2>
          <p className="mt-1 text-sm text-slate-500">Complete the information below to prepare your offer.</p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Brand Name
            <input
              required
              name="brandName"
              value={form.brandName}
              onChange={handleInputChange}
              placeholder="e.g. Palm Restaurant"
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Venue Owner Name
            <input
              required
              name="ownerName"
              value={form.ownerName}
              onChange={handleInputChange}
              placeholder="Full name"
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Start Date
            <input
              required
              type="date"
              name="fromDate"
              value={form.fromDate}
              onChange={handleInputChange}
              max={form.toDate || undefined}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            End Date
            <input
              required
              type="date"
              name="toDate"
              value={form.toDate}
              onChange={handleInputChange}
              min={form.fromDate || undefined}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Price (EGP)
            <input
              required
              type="number"
              name="price"
              min="0.01"
              step="0.01"
              value={form.price}
              onChange={handleInputChange}
              placeholder="0.00"
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Proposal Language
            <select
              name="language"
              value={form.language}
              onChange={handleInputChange}
              className={`${inputClass} bg-white`}
            >
              <option value="en">English</option>
              <option value="ar">العربية (Arabic)</option>
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700 sm:col-span-2">
            Notes <span className="font-normal text-slate-400">(optional, shown on the proposal)</span>
            <textarea
              name="note"
              value={form.note}
              onChange={handleInputChange}
              rows={4}
              maxLength={600}
              placeholder="Add any extra details for the client..."
              className={`${inputClass} resize-y`}
            />
            <span className="text-xs font-normal text-slate-400">{form.note.length} / 600</span>
          </label>
        </div>

        <fieldset className="mt-7">
          <legend className="mb-3 text-sm font-semibold text-gray-700">
            Products & Services
          </legend>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {products.map(({ value, label }) => (
              <label
                key={value}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 transition hover:border-mainColor/50 hover:bg-red-50/40"
              >
                <input
                  type="checkbox"
                  value={value}
                  checked={selectedProducts.includes(value)}
                  onChange={handleProductChange}
                  className="h-4 w-4 accent-mainColor"
                />
                {label}
              </label>
            ))}
          </div>
          {productsError && (
            <p role="alert" className="mt-2 text-sm text-red-600">
              {productsError}
            </p>
          )}
        </fieldset>

        <div className="mt-7 flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-lg bg-mainColor px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
          >
            Generate Proposal
          </button>
          {proposal && (
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="inline-flex items-center gap-2 rounded-lg border border-mainColor px-5 py-2.5 text-sm font-semibold text-mainColor transition hover:bg-mainColor/5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <HiOutlineDownload className="h-5 w-5" />
              {isDownloading ? "Preparing PDF..." : "Download as PDF"}
            </button>
          )}
        </div>
        {downloadError && (
          <p role="alert" className="mt-3 text-sm text-red-600">
            {downloadError}
          </p>
        )}
      </form>

      {proposal && (
        <section
          ref={proposalRef}
          aria-label="Financial proposal preview"
          dir={tr.dir}
          lang={isArabic ? "ar" : "en"}
          className="proposal-document mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg"
        >
          <div className="bg-gradient-to-r from-mainColor to-[#6f080c] px-6 py-8 text-white sm:px-10">
            <div className="flex items-start justify-between gap-4">
              <span className="inline-flex rounded-xl bg-white px-3 py-2">
                <img src={logoSrc} alt="Food2Go" className="h-10 w-auto" />
              </span>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">{tr.commercialOffer}</p>
            </div>
            <h2 className="mt-3 text-3xl font-bold">{tr.title}</h2>
            <p className="mt-2 text-sm text-white/80">{tr.subtitle}</p>
            <p className="mt-4 text-sm text-white/80">
              {tr.preparedFor} <span className="font-semibold text-white">{proposal.brandName}</span>
            </p>
          </div>

          <div className="p-6 sm:p-10">
            <p className="mb-8 text-sm leading-7 text-slate-600">{tr.intro}</p>

            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className={`${sideBar} border-mainColor`}>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{tr.venueOwner}</p>
                <p className="mt-1 font-semibold text-slate-800">{proposal.ownerName}</p>
              </div>
              <div className={`${sideBar} border-mainColor`}>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{tr.brand}</p>
                <p className="mt-1 font-semibold text-slate-800">{proposal.brandName}</p>
              </div>
              <div className={`${sideBar} border-slate-200`}>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{tr.startDate}</p>
                <p className="mt-1 font-semibold text-slate-800">{formatDate(proposal.fromDate, tr.locale)}</p>
              </div>
              <div className={`${sideBar} border-slate-200`}>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{tr.validUntil}</p>
                <p className="mt-1 font-semibold text-slate-800">{formatDate(proposal.toDate, tr.locale)}</p>
              </div>
            </div>

            <div className="mt-9">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-800">{tr.scope}</h3>
              <ul className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200">
                {proposal.products.map((product) => (
                  <li
                    key={product.value}
                    className="flex items-center justify-between gap-3 px-4 py-4 text-sm text-slate-700"
                  >
                    <span className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-mainColor" />
                      {isArabic ? product.labelAr : product.label}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-mainColor">{tr.included}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-col gap-2 rounded-xl bg-red-50 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-mainColor">{tr.total}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {tr.validThrough} {formatDate(proposal.toDate, tr.locale)}
                </p>
              </div>
              <span className="text-2xl font-bold text-mainColor">
                {formatPrice(proposal.price, tr.locale)} {tr.currency}
              </span>
            </div>

            {proposalNote && (
              <div className="mt-8">
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-800">{tr.notes}</h3>
                <p className="whitespace-pre-line rounded-xl bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-700">
                  {proposalNote}
                </p>
              </div>
            )}

            <div className="mt-8">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-800">{tr.terms}</h3>
              <ol className="space-y-1.5 text-sm leading-6 text-slate-500">
                {tr.termsList.map((term, index) => (
                  <li key={term} className="flex gap-2">
                    <span>{new Intl.NumberFormat(tr.locale).format(index + 1)}.</span>
                    <span>{term}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-10">
              <div className="border-t border-slate-300 pt-2 text-xs text-slate-500">{tr.repOurs}</div>
              <div className="border-t border-slate-300 pt-2 text-xs text-slate-500">{tr.repClient}</div>
            </div>

            <p className="mt-10 border-t border-slate-100 pt-5 text-center text-xs text-slate-400">{tr.thanks}</p>
          </div>
        </section>
      )}
    </main>
  );
};

export default ProposalPage;