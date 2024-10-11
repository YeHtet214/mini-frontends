import React, { useEffect, useState } from 'react'
import { ArrowRight, Clock, Tag, Percent } from 'lucide-react'
import { Button } from "@/components/ui/button"
import axios from 'axios';
import Header from "@shared/src/components/Header.tsx";
import Footer from "@shared/src/components/Footer.tsx";
import PageLoader from "@shared/src/components/PageLoader.tsx";


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = getCookie("token");
        if (!token) {
          window.location.href = "http://localhost:3000?redirectApp=SaleApp";
          return;
        }
        const response = await axios.post("http://localhost:5000/auth/verify-token?redirectApp=SaleApp", {}, {
          withCredentials: true
        })

        if (response.status != 200) {
          window.location.href = "http://localhost:3000?redirectApp=SaleApp";
          return;
        } else {
          setLoading(false);
        }
      } catch(err) {
        console.log(err);
        window.location.href = "http://localhost:3000?redirectApp=SaleApp";
      }
    })();
  }, []);

  if (loading) {
    return (
      <PageLoader />
    )
  }

  return (
    <div className="min-h-screen flex-col flex justify-between">
      <Header />
      <main className="container mx-auto px-4 py-16 text-center flex-1">
        <h1 className="text-5xl font-bold mb-4">TechWave Pulse Sale</h1>
        <p className="text-xl text-gray-600 mb-8">Limited Time Offer: 20% Off</p>
        
        <div className="relative inline-block mb-12">
          <img
            src="/placeholder.svg?height=400&width=400"
            alt="TechWave Pulse Smartwatch on Sale"
            className="rounded-lg shadow-2xl"
          />
          <div className="absolute -top-4 -right-4 bg-red-500 text-white text-lg font-bold px-4 py-2 rounded-full">
            20% OFF
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <SaleFeature 
            icon={<Clock className="w-8 h-8 text-blue-500 mb-2" />}
            title="Limited Time"
            description="Sale ends in 48 hours"
          />
          <SaleFeature 
            icon={<Tag className="w-8 h-8 text-blue-500 mb-2" />}
            title="Best Value"
            description="Get more for less"
          />
          <SaleFeature 
            icon={<Percent className="w-8 h-8 text-blue-500 mb-2" />}
            title="Huge Savings"
            description="Save $60 on your purchase"
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold mb-4">Sale Price: $239</h2>
          <p className="text-xl text-gray-600 mb-4"><s>Regular Price: $299</s></p>
          <Button size="lg" className="text-lg">
            Buy Now <ArrowRight className="ml-2" />
          </Button>
        </div>

        <p className="text-gray-600">
          Don't miss out on this amazing offer. Get your TechWave Pulse today and stay ahead of the curve!
        </p>
      </main>

      <Footer />
    </div>
  )
}

interface Props {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function SaleFeature({ icon, title, description }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-center mb-2">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
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
