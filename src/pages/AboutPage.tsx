import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import CategoriesFilter from "@/components/home/CategoriesFilter";

const AboutPage = () => {
  const [mapActive, setMapActive] = useState(false);

  return (
    <div className="min-h-screen bg-bg-main overflow-x-hidden relative">
      <div className="aurora-glow" aria-hidden="true" />
      <Header />
      <CategoriesFilter />
      <main>
        {/* Hero */}
        <section className="content-container pt-[40px] md:pt-[80px] pb-[40px] md:pb-[60px]">
          <h1 className="font-semibold text-[36px] md:text-[56px] leading-[1.1] tracking-[-1px] text-azure-4 m-0">
            О Пайстартер
          </h1>
        </section>

        {/* Contacts + Map */}
        <section className="content-container pb-[60px] md:pb-[100px]">
          <div className="flex flex-col md:flex-row gap-[24px] md:gap-[40px] items-start">
            {/* Contact info */}
            <div className="flex flex-col gap-[28px] md:gap-[36px] w-full md:w-[400px] shrink-0">
              <h2 className="font-semibold text-[24px] md:text-[32px] leading-[1.2] text-azure-4 m-0">
                Контакты
              </h2>

              <div className="flex flex-col gap-[20px]">
                {/* Email */}
                <div className="flex flex-col gap-[4px]">
                  <span className="text-[13px] text-grey-71 font-medium uppercase tracking-wider">
                    Электронная почта
                  </span>
                  <a
                    href="mailto:hi@piestarter.ru"
                    className="text-[16px] md:text-[18px] text-cyan-2 hover:underline transition-all"
                  >
                    hi@piestarter.ru
                  </a>
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-[4px]">
                  <span className="text-[13px] text-grey-71 font-medium uppercase tracking-wider">
                    Телефон
                  </span>
                  <a
                    href="tel:+79001234567"
                    className="text-[16px] md:text-[18px] text-cyan-2 hover:underline transition-all"
                  >
                    +7 900 123-45-67
                  </a>
                </div>

                {/* Address */}
                <div className="flex flex-col gap-[4px]">
                  <span className="text-[13px] text-grey-71 font-medium uppercase tracking-wider">
                    Адрес
                  </span>
                  <p className="text-[16px] md:text-[18px] text-cyan-2 leading-[26px] m-0">
                    пер. Большой Афанасьевский, д. 41, стр. 2,<br />
                    этаж 5, Россия, Москва, 119019
                  </p>
                  <span className="text-[14px] text-grey-44 mt-[4px]">БЦ Ботаника</span>
                </div>
              </div>
            </div>

            {/* Map */}
            <div
              className="h-[300px] sm:h-[380px] md:h-[440px] overflow-hidden rounded-[20px] md:rounded-[32px] w-full md:flex-1 relative"
              onMouseLeave={() => setMapActive(false)}
            >
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=37.588480,55.747520&z=16&l=map&pt=37.588480,55.747520,pm2blm&lang=ru_RU"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen={false}
                style={{ border: 0, borderRadius: "inherit" }}
                title="Офис Пайстартер на карте"
              />
              {!mapActive && (
                <div
                  className="absolute inset-0 z-10 cursor-pointer"
                  onClick={() => setMapActive(true)}
                />
              )}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
