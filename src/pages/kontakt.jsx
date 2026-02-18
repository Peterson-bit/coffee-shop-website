import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const Icon = ({ path, className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d={path} />
  </svg>
);

const Kontakt = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); 
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (submissionStatus) {
      const timer = setTimeout(() => {
        setSubmissionStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submissionStatus]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setSubmissionStatus('error');
      return;
    }
    setLoading(true);
    setSubmissionStatus(null);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
      );
      setSubmissionStatus('success');
      setForm({ name: "", email: "", message: "" });
    } catch (error)
    {
      console.error("Błąd wysyłania EmailJS:", error);
      setSubmissionStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: "url('/img/kawa.jpg')" }} 
      />
      <div className="absolute inset-0 bg-black/70" /> 
      
      <div className="container mx-auto px-4 md:px-10 relative z-10">
        <div className="mb-16 flex flex-col items-center justify-center text-center">
          <p className="font-circular-web text-4xl md:text-5xl font-semibold text-blue-50 mb-4 tracking-wide drop-shadow-lg">
            ✨ Nawiążmy Kontakt
          </p>
          <p className="max-w-2xl font-circular-web text-xl md:text-2xl text-blue-50 opacity-70 leading-relaxed">
            Masz pytanie lub pomysł na współpracę? Czekamy na Twoją wiadomość.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          {/* LEWA STRONA: FORMULARZ */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-yellow-500 mb-6">Napisz do nas</h3>
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div className="relative">
                <input
                  type="text" id="name" name="name"
                  value={form.name} onChange={handleChange}
                  className="peer block w-full bg-transparent border-0 border-b-2 border-gray-500 text-white py-2 px-1 focus:outline-none focus:ring-0 focus:border-yellow-600"
                  placeholder=" " required
                />
                <label htmlFor="name" className="absolute text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Twoje imię
                </label>
              </div>

              <div className="relative mt-4">
                <input
                  type="email" id="email" name="email"
                  value={form.email} onChange={handleChange}
                  className="peer block w-full bg-transparent border-0 border-b-2 border-gray-500 text-white py-2 px-1 focus:outline-none focus:ring-0 focus:border-yellow-600"
                  placeholder=" " required
                />
                <label htmlFor="email" className="absolute text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Twój adres e-mail
                </label>
              </div>

              <div className="relative mt-4">
                <textarea
                  id="message" name="message"
                  value={form.message} onChange={handleChange}
                  className="peer block w-full bg-transparent border-0 border-b-2 border-gray-500 text-white py-2 px-1 focus:outline-none focus:ring-0 focus:border-yellow-600 h-28 resize-none"
                  placeholder=" " required
                />
                <label htmlFor="message" className="absolute text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Twoja wiadomość
                </label>
              </div>

              <button type="submit" disabled={loading} className="mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-yellow-700 via-yellow-600 to-yellow-700 text-yellow-50 font-semibold text-lg shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-dashed rounded-full animate-spin border-white"></div>
                    Wysyłanie...
                  </>
                ) : (
                  <>
                    Wyślij Wiadomość
                    <Icon path="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                  </>
                )}
              </button>
              
              {submissionStatus === 'success' && <p className="text-green-400 text-center mt-4">Dziękujemy! Twoja wiadomość została wysłana.</p>}
              {submissionStatus === 'error' && <p className="text-red-400 text-center mt-4">Ups! Coś poszło nie tak. Spróbuj ponownie.</p>}
            </form>
          </div>

          {/* PRAWA STRONA: INFORMACJE I MAPA */}
          <div className="flex flex-col gap-8">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-yellow-500 mb-6">Informacje Kontaktowe</h3>
              <ul className="space-y-5 text-lg text-blue-50/80">
                <li className="flex items-center gap-4">
                  <Icon path="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  <span>ul. Kawowa 12, 00-001 Warszawa</span>
                </li>
                <li className="flex items-center gap-4">
                  <Icon path="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
                  <a href="tel:+48123456789" className="hover:text-yellow-500 transition-colors">+48 123 456 789</a>
                </li>
                <li className="flex items-center gap-4">
                  <Icon path="M21.75 6.75v10.5a2.25 2.25 0 01-2.25-2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  <a href="mailto:kontakt@kawiarnia.pl" className="hover:text-yellow-500 transition-colors">kontakt@czarnypuls.pl</a>
                </li>
                <li className="flex items-center gap-4">
                   <Icon path="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <span>Pn-Sb: 8:00 - 20:00, Nd: 10:00 - 18:00</span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.766107383136!2d21.01012931575195!3d52.22986877975984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc669a869f01%3A0x72f0be439167b613!2sPa%C5%82ac%20Kultury%20i%20Nauki!5e0!3m2!1spl!2spl!4v1676483584852!5m2!1spl!2spl"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Kontakt;