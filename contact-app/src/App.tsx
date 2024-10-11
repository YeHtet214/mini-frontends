import { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Mail } from 'lucide-react'

import Header from "@shared/src/components/Header.tsx";
import Footer from "@shared/src/components/Footer.tsx";
import PageLoader from "@shared/src/components/PageLoader.tsx";

function App() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = getCookie("token");
        if (!token) {
          window.location.href = "http://localhost:3000?redirectApp=ContactApp";
          return;
        }
        const response = await axios.post("http://localhost:5000/auth/verify-token?redirectApp=ContactApp", {}, {
          withCredentials: true
        })

        if (response.status != 200) {
          window.location.href = "http://localhost:3000?redirectApp=ContactApp";
          return;
        } else {
          setLoading(false);
        }
      } catch(err) {
        console.log(err);
        window.location.href = "http://localhost:3000?redirectApp=ContactApp";
      }
    })();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    // Reset form after submission
    setFormData({ name: '', email: '', message: '' })
  }

  if (loading) {
    return (
      <PageLoader />
    )
  }

  return (
    <div className='w-full min-h-screen flex flex-col items-between items-stretch'>
      <Header />
      <main className="flex-1">
        <div className=" px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
              <p className="mb-4">We'd love to hear from you. Please fill out this form and we will get in touch with you shortly.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button type="submit">Send Message</Button>
              </form>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
                  <p>123 Main St, Anytown, USA 12345</p>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-5 w-5 text-muted-foreground" />
                  <p>(123) 456-7890</p>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-muted-foreground" />
                  <p>contact@example.com</p>
                </div>
              </div>
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Our Location</h2>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968482413!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes+Square!5e0!3m2!1sen!2sus!4v1510579767785"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps"
                    className="w-full h-full rounded-md"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
}

export default App
