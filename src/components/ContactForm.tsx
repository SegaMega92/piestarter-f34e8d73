import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ContactField {
  name: string;
  label: string;
  type: string;
  enabled: boolean;
}

interface ContactSettings {
  title: string;
  subtitle: string;
  telegram_url: string;
  email: string;
  fields: ContactField[];
}

const ContactForm = () => {
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [settings, setSettings] = useState<ContactSettings | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("*")
        .eq("key", "contact_form")
        .single();
      if (data) setSettings(data.value as unknown as ContactSettings);
    };
    load();
  }, []);

  if (!settings) return null;

  const enabledFields = settings.fields.filter((f) => f.enabled);
  const shortFields = enabledFields.filter((f) => f.type !== "textarea");
  const textareaFields = enabledFields.filter((f) => f.type === "textarea");

  const handleSubmit = async () => {
    if (!agreed) {
      toast.error("Необходимо согласие на обработку данных");
      return;
    }
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const name = (formData.get("name") as string)?.trim() || "";
    const phone = (formData.get("phone") as string)?.trim() || "";
    const email = (formData.get("email") as string)?.trim() || "";
    const message = (formData.get("message") as string)?.trim() || "";

    if (!name && !phone && !email) {
      toast.error("Заполните хотя бы одно поле");
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("submit-lead", {
        body: { name, phone, email, message, source: "contact_form" },
      });
      if (error) throw error;
      toast.success("Сообщение отправлено!");
      form.reset();
      setAgreed(false);
    } catch {
      toast.error("Ошибка отправки, попробуйте позже");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-grey-96 rounded-t-[24px] md:rounded-t-[40px] w-full py-[60px] md:py-[120px]">
      <div className="content-container flex flex-col md:flex-row gap-[24px] md:gap-[30px] items-start">
        {/* Left */}
        <div className="flex flex-col gap-[16px] md:gap-[24px] items-start w-full md:flex-1 md:min-w-0">
          <h2 className="font-semibold text-[28px] md:text-[48px] leading-[1.1] tracking-[-0.96px] text-black m-0">
            {settings.title}
          </h2>
          <p className="font-normal text-[16px] md:text-[18px] text-grey-44 leading-[24px] m-0">
            {settings.subtitle}{" "}
            {settings.telegram_url && (
              <>
                <a href={settings.telegram_url} target="_blank" rel="noopener" className="text-cyan-2 cursor-pointer hover:underline transition-all">телеграм</a>
                {settings.email && " или на электронную почту: "}
              </>
            )}
            {settings.email && (
              <a href={`mailto:${settings.email}`} className="text-cyan-2 cursor-pointer hover:underline transition-all">{settings.email}</a>
            )}
          </p>
        </div>
        {/* Right: Form */}
        <form ref={formRef} className="flex flex-col gap-[20px] md:gap-[30px] items-start w-full md:flex-1 md:min-w-0" onSubmit={(e) => e.preventDefault()}>
          {shortFields.map((field) => (
            <div key={field.name} className="flex flex-col gap-[8px] md:gap-[12px] items-start w-full">
              <label className="font-semibold text-[16px] md:text-[18px] text-cyan-2 leading-[24px]">{field.label}</label>
              <input
                name={field.name}
                type={field.type}
                className="bg-white border border-grey-71 h-[44px] rounded-[10px] w-full px-[12px] outline-none focus:border-blue-second focus:ring-1 focus:ring-blue-second transition-all"
              />
            </div>
          ))}
          {textareaFields.map((field) => (
            <div key={field.name} className="flex flex-col gap-[8px] md:gap-[12px] items-start w-full">
              <label className="font-semibold text-[16px] md:text-[18px] text-cyan-2 leading-[24px]">{field.label}</label>
              <textarea
                name={field.name}
                className="bg-white border border-grey-71 rounded-[10px] w-full p-[10px] text-[16px] font-normal leading-[24px] text-grey-71 resize-none outline-none focus:border-blue-second focus:ring-1 focus:ring-blue-second transition-all"
                rows={3}
                placeholder="Можете указать как и во сколько с вами лучше связаться"
              />
            </div>
          ))}
          <div className="flex gap-[12px] items-center">
            <button
              type="button"
              onClick={() => setAgreed(!agreed)}
              className={`rounded-[4px] w-[18px] h-[18px] shrink-0 cursor-pointer border transition-colors flex items-center justify-center ${
                agreed ? "bg-blue-second border-blue-second" : "bg-white border-grey-71 hover:border-grey-44"
              }`}
            >
              {agreed && (
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                  <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
            <span className="text-[14px] md:text-[18px] text-grey-44 leading-[22px] md:leading-[24px] cursor-pointer select-none" onClick={() => setAgreed(!agreed)}>
              Соглашаюсь с <span className="hover:underline">политикой обработки данных</span>
            </span>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!agreed || submitting}
            className="bg-azure-13 flex items-center justify-center px-[30px] py-[14px] md:py-[18px] rounded-[30px] w-full cursor-pointer hover:bg-[#2a3040] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="font-semibold text-[16px] md:text-[18px] text-white">
              {submitting ? "Отправка..." : "Отправить сообщение"}
            </span>
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
