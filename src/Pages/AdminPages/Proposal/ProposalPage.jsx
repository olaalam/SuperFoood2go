import { useState } from "react";
import { jsPDF } from "jspdf";
import { HiOutlineDocumentText, HiOutlineDownload } from "react-icons/hi";

const products = [
  { value: "kitchen-web", label: "Kitchen (Web)" },
  { value: "captain-order-app", label: "Captain Order (App)" },
  { value: "pos-desktop", label: "POS (Desktop App)" },
  { value: "pos-app", label: "POS (App)" },
  { value: "pos-web", label: "POS (Web)" },
];

const initialForm = {
  fromDate: "",
  toDate: "",
  price: "",
  brandName: "",
  ownerName: "",
};

const formatDate = (date) =>
  new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));

const formatPrice = (price) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(price));

const ProposalPage = () => {
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

  const handleDownloadPdf = () => {
    if (!proposal) {
      return;
    }

    setDownloadError("");
    try {
      const pdf = new jsPDF({ unit: "mm", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 18;
      const accent = [158, 9, 15];
      const dark = [35, 39, 47];
      const muted = [112, 119, 130];
      const light = [247, 248, 250];
      const right = pageWidth - margin;

      pdf.setProperties({
        title: `Financial Proposal - ${proposal.brandName}`,
        subject: "Food2Go financial proposal",
        author: "Food2Go",
      });

      pdf.setFillColor(...accent);
      pdf.rect(0, 0, pageWidth, 48, "F");
      pdf.setTextColor(255, 255, 255);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.text("FOOD2GO", margin, 15);
      pdf.setFontSize(22);
      pdf.text("FINANCIAL PROPOSAL", margin, 28);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.text("A tailored solution for your business", margin, 37);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9);
      pdf.text("COMMERCIAL OFFER", right, 15, { align: "right" });

      pdf.setTextColor(...dark);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      pdf.text("PREPARED FOR", margin, 64);

      const detailsTop = 71;
      const detailsHeight = 43;
      pdf.setFillColor(...light);
      pdf.roundedRect(margin, detailsTop, pageWidth - margin * 2, detailsHeight, 3, 3, "F");
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.setTextColor(...muted);
      pdf.text("BRAND", margin + 7, detailsTop + 11);
      pdf.text("VENUE OWNER", margin + 7, detailsTop + 29);
      pdf.text("PROPOSAL PERIOD", margin + 94, detailsTop + 11);
      pdf.text("VALID UNTIL", margin + 94, detailsTop + 29);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.setTextColor(...dark);
      pdf.text(proposal.brandName, margin + 7, detailsTop + 17);
      pdf.text(proposal.ownerName, margin + 7, detailsTop + 35);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.text(formatDate(proposal.fromDate), margin + 94, detailsTop + 17);
      pdf.text(formatDate(proposal.toDate), margin + 94, detailsTop + 35);

      const tableTop = 132;
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      pdf.setTextColor(...dark);
      pdf.text("SCOPE OF SERVICES", margin, tableTop);
      pdf.setFillColor(...accent);
      pdf.roundedRect(margin, tableTop + 7, pageWidth - margin * 2, 11, 2, 2, "F");
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(8);
      pdf.text("PRODUCT / SERVICE", margin + 5, tableTop + 14);
      pdf.text("STATUS", right - 5, tableTop + 14, { align: "right" });

      let rowTop = tableTop + 18;
      proposal.products.forEach((product, index) => {
        if (index % 2 === 0) {
          pdf.setFillColor(250, 250, 251);
          pdf.rect(margin, rowTop, pageWidth - margin * 2, 11, "F");
        }
        pdf.setTextColor(...dark);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9);
        pdf.text(product.label, margin + 5, rowTop + 7);
        pdf.setTextColor(...accent);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(8);
        pdf.text("INCLUDED", right - 5, rowTop + 7, { align: "right" });
        rowTop += 11;
      });

      const totalTop = rowTop + 13;
      pdf.setFillColor(252, 242, 243);
      pdf.roundedRect(margin, totalTop, pageWidth - margin * 2, 25, 3, 3, "F");
      pdf.setTextColor(...dark);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.text("TOTAL PROPOSAL VALUE", margin + 7, totalTop + 15);
      pdf.setTextColor(...accent);
      pdf.setFontSize(16);
      pdf.text(`${formatPrice(proposal.price)} EGP`, right - 7, totalTop + 16, {
        align: "right",
      });

      pdf.setTextColor(...muted);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.text(`This proposal is valid through ${formatDate(proposal.toDate)}.`, margin, totalTop + 39);
      pdf.setDrawColor(225, 228, 232);
      pdf.line(margin, 273, right, 273);
      pdf.setFontSize(8);
      pdf.text("Thank you for choosing Food2Go.", margin, 281);
      pdf.text("FOOD2GO  |  FINANCIAL PROPOSAL", right, 281, { align: "right" });

      const fileName = `Food2Go-Proposal-${proposal.brandName.trim().replace(/[^a-z0-9]+/gi, "-") || "client"}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error("Failed to generate proposal PDF:", error);
      setDownloadError("The PDF could not be generated. Please try again.");
    }
  };

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
              className="rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-mainColor focus:ring-2 focus:ring-mainColor/10"
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
              className="rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-mainColor focus:ring-2 focus:ring-mainColor/10"
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
              className="rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-mainColor focus:ring-2 focus:ring-mainColor/10"
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
              className="rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-mainColor focus:ring-2 focus:ring-mainColor/10"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700 sm:col-span-2">
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
              className="rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-mainColor focus:ring-2 focus:ring-mainColor/10 sm:max-w-sm"
            />
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
              className="inline-flex items-center gap-2 rounded-lg border border-mainColor px-5 py-2.5 text-sm font-semibold text-mainColor transition hover:bg-mainColor/5"
            >
              <HiOutlineDownload className="h-5 w-5" />
              Download as PDF
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
          aria-label="Financial proposal preview"
          className="proposal-document mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg"
        >
          <div className="bg-gradient-to-r from-mainColor to-[#6f080c] px-6 py-8 text-white sm:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Food2Go | Sales</p>
            <h2 className="mt-3 text-3xl font-bold">Financial Proposal</h2>
            <p className="mt-2 text-sm text-white/80">
              Prepared for <span className="font-semibold text-white">{proposal.brandName}</span>
            </p>
          </div>

          <div className="p-6 sm:p-10">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="border-l-2 border-mainColor pl-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Venue Owner</p>
                <p className="mt-1 font-semibold text-slate-800">{proposal.ownerName}</p>
              </div>
              <div className="border-l-2 border-mainColor pl-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Brand Name</p>
                <p className="mt-1 font-semibold text-slate-800">{proposal.brandName}</p>
              </div>
              <div className="border-l-2 border-slate-200 pl-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Start Date</p>
                <p className="mt-1 font-semibold text-slate-800">{formatDate(proposal.fromDate)}</p>
              </div>
              <div className="border-l-2 border-slate-200 pl-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Valid Until</p>
                <p className="mt-1 font-semibold text-slate-800">{formatDate(proposal.toDate)}</p>
              </div>
            </div>

            <div className="mt-9">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-800">Products & Services</h3>
              <ul className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200">
                {proposal.products.map((product) => (
                  <li key={product.value} className="flex items-center gap-3 px-4 py-4 text-sm text-slate-700">
                    <span className="h-2 w-2 rounded-full bg-mainColor" />
                    {product.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-col gap-2 rounded-xl bg-red-50 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-mainColor">Total Proposal Value</p>
                <p className="mt-1 text-sm text-slate-500">Valid through {formatDate(proposal.toDate)}</p>
              </div>
              <span className="text-2xl font-bold text-mainColor">
                {formatPrice(proposal.price)} EGP
              </span>
            </div>

            <p className="mt-8 border-t border-slate-100 pt-5 text-center text-xs text-slate-400">
              Thank you for choosing Food2Go.
            </p>
          </div>
        </section>
      )}
    </main>
  );
};

export default ProposalPage;
