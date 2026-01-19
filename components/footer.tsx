import { Phone, Mail, Locate, Github } from "lucide-react";
import Image from "next/image";
export default function Footer() {
  return (
    <>
      <footer className="section bg-accent font-doto font-extrabold">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-8">
          <div className="flex flex-col justify-center items-start gap-1">
            <h6 className="text-muted-foreground text-2xl font-extrabold underline">
              Get in Touch
            </h6>
            <a
              href="mailto:nkca122@gmail.com"
              className="text-base flex justify-center items-center gap-2"
            >
              <Mail size={12} /> nkca122@gmail.com
            </a>
            <a
              href="tel:+919625362621"
              className="text-base flex justify-center items-center gap-2"
            >
              <Phone size={12} /> +91-9625362621
            </a>
            <p className="text-base flex justify-center items-center gap-2">
              <Locate size={12} /> Gurugram, Haryana, India
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
            <div className="relative w-25 aspect-square">
              <Image src={"/logo.png"} fill preload alt="" />
            </div>
            <h6 className="text-emerald-600 text-base">
              The Mitigation Initiative
            </h6>
            <p className="text-sm text-muted-foreground">
              A Disaster Prepardness Initiative
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
            <p className="text-center">
              A project created by,
              <a
                href="https://github.com/Nkca122"
                className="underline flex items-center justify-center gap-2"
              >
                <Github size={14} /> Nkca122
              </a>
              for Smart India Hackathon 2025
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
