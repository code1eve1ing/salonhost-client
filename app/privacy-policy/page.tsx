import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for SalonHost",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-gray-50 py-12 md:py-20">
      <div className="mx-auto max-w-4xl rounded-xl bg-white px-6 py-10 shadow-sm md:px-12 md:py-14">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
          Privacy Policy
        </h1>

        <p className="mb-8 text-sm text-gray-500">
          <strong>Effective Date:</strong> August 4, 2026
        </p>

        <p className="mb-10 text-lg leading-8 text-gray-700">
          This Privacy Policy explains how <strong>SalonHost</strong> ("we",
          "our", or "us") collects, uses, and protects information when you use
          our application and services.
        </p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Information We Collect
          </h2>

          <p className="leading-7 text-gray-700">
            Depending on how you use our service, we may collect:
          </p>

          <ul className="list-disc space-y-2 pl-6 text-gray-700 leading-7">
            <li>Name and profile information provided through Meta.</li>
            <li>WhatsApp phone number.</li>
            <li>Messages exchanged with our WhatsApp Business account.</li>
            <li>
              Technical information such as IP address, browser type, and device
              information.
            </li>
            <li>Usage logs for security, analytics, and troubleshooting.</li>
          </ul>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            How We Use Your Information
          </h2>

          <p className="leading-7 text-gray-700">
            We use collected information to:
          </p>

          <ul className="list-disc space-y-2 pl-6 text-gray-700 leading-7">
            <li>Provide and operate our services.</li>
            <li>Respond to customer inquiries.</li>
            <li>Send WhatsApp messages that you request or authorize.</li>
            <li>Improve our products and services.</li>
            <li>Maintain security and prevent fraud or abuse.</li>
            <li>Comply with applicable legal obligations.</li>
          </ul>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            WhatsApp and Meta
          </h2>

          <p className="leading-7 text-gray-700">
            Our application uses the WhatsApp Business Platform provided by
            Meta. Your use of WhatsApp is also subject to Meta's privacy
            practices and applicable terms.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Information Sharing
          </h2>

          <p className="leading-7 text-gray-700">
            We do not sell your personal information.
          </p>

          <p className="leading-7 text-gray-700">
            We may share information with:
          </p>

          <ul className="list-disc space-y-2 pl-6 text-gray-700 leading-7">
            <li>Meta Platforms, Inc. to provide WhatsApp messaging services.</li>
            <li>Trusted service providers that help us operate our application.</li>
            <li>Authorities when required by applicable law.</li>
          </ul>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Data Retention
          </h2>

          <p className="leading-7 text-gray-700">
            We retain personal information only as long as necessary to provide
            our services, comply with legal obligations, resolve disputes, and
            enforce our agreements.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Data Security
          </h2>

          <p className="leading-7 text-gray-700">
            We implement reasonable technical and organizational measures to
            protect personal information against unauthorized access,
            disclosure, or loss.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Your Rights
          </h2>

          <p className="leading-7 text-gray-700">
            Depending on your jurisdiction, you may have rights to access,
            correct, delete, or restrict the processing of your personal
            information.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Children's Privacy
          </h2>

          <p className="leading-7 text-gray-700">
            Our services are not directed toward children under the age required
            by applicable law. We do not knowingly collect personal information
            from children.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Changes to This Privacy Policy
          </h2>

          <p className="leading-7 text-gray-700">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated effective date.
          </p>
        </section>

        <section className="mt-10 space-y-4 border-t pt-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Contact Us
          </h2>

          <p className="leading-7 text-gray-700">
            If you have any questions regarding this Privacy Policy, please
            contact:
          </p>

          <div className="rounded-lg border bg-gray-50 p-5">
            <p className="font-semibold text-gray-900">SalonHost</p>
            <p className="mt-2 text-gray-700">
              Email:{" "}
              <a
                href="mailto:sanket.m.mistry@gmail.com"
                className="text-blue-600 hover:underline"
              >
                sanket.m.mistry@gmail.com
              </a>
            </p>
            <p className="text-gray-700">
              Website:{" "}
              <a
                href="https://salonhost.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://salonhost.in
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}