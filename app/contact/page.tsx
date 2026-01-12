<form
  action="https://formspree.io/f/xpqqaplr"
  method="POST"
  className="bg-[#f9fafb] p-8 rounded-lg shadow-lg space-y-6"
>
  <input type="hidden" name="_subject" value="New Contact Form Message" />

  <label className="block">
    <span className="block mb-2 font-semibold text-[#47549e]">Name</span>
    <input name="name" required className="w-full border rounded-lg px-4 py-3" />
  </label>

  <label className="block">
    <span className="block mb-2 font-semibold text-[#47549e]">Email</span>
    <input name="email" type="email" required className="w-full border rounded-lg px-4 py-3" />
  </label>

  <label className="block">
    <span className="block mb-2 font-semibold text-[#47549e]">Message</span>
    <textarea name="message" required rows={6} className="w-full border rounded-lg px-4 py-3" />
  </label>

  <button
    type="submit"
    className="w-full bg-[#82b0d5] text-white font-semibold py-3 rounded-lg"
  >
    Send Message
  </button>
</form>
