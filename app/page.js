import HeroSection from "@/components/custom/Hero";
import { features } from "@/data/features";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { howItWorks } from "@/data/howItWorks";
import { testimonial } from "@/data/testimonial";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/data/faqs";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
export default function Home() {
  return (
    <div className="relative -mb-64">
      {/* Background Layer */}
      <div className="grid-background flex mt-18"></div>

      {/* Main Content */}
      <div className="relative z-10 h-full items-center ">
        <HeroSection />
      </div>

      <section>
        <div className="w-full mx-auto flex flex-col bg-[#050505] px-14 mt-4 py-24">
          <h1 className="text-3xl font-bold mx-auto text-center mt-20">
            Powerful Features For Your Career Growth
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 py-3 mt-20 space-x-5 space-y-5 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="hover:scale-105 w-full h-full border-1 hover:border-gray-200 rounded-lg"
              >
                <Card className="h-full bg-[#050505]/80">
                  <CardContent>
                    <span className="flex justify-center">{feature.icon}</span>
                    <h2 className="text-center font-bold">{feature.title}</h2>
                    <p className="text-muted-foreground text-center">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="w-full py-12 mx-auto flex flex-col  justify-center bg-muted/50 px-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 py-18 mt-4 space-x-5 space-y-10 gap-4">
            <div>
              <h1 className="text-3xl font-bold mx-auto text-center ">50+</h1>
              <p className="text-muted-foreground text-center mt-1">
                Industries Covered
              </p>
            </div>
            <div>
              <h1 className="text-3xl font-bold mx-auto text-center ">1000+</h1>
              <p className="text-muted-foreground text-center mt-1">
                Interview Questions
              </p>
            </div>
            <div>
              <h1 className="text-3xl font-bold mx-auto text-center ">97%</h1>
              <p className="text-muted-foreground text-center mt-1">
                Sucess Rate
              </p>
            </div>
            <div>
              <h1 className="text-3xl font-bold mx-auto text-center ">24/7</h1>
              <p className="text-muted-foreground text-center mt-1">
                AI Support
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="w-full mx-auto flex flex-col bg-[#050505] px-14 py-24">
          <h1 className="text-3xl font-bold mx-auto text-center mt-20">
            How It Works
          </h1>
          <p className="text-muted-foreground text-center mt-2">
            Four Simple Steps To Accelerate Your Career Growth
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 py-3 mt-20 space-x-5 space-y-10 gap-4">
            {howItWorks.map((item, index) => (
              <div key={index} className="space-y-4">
                <span className="flex justify-center">
                  <div className="bg-muted rounded-full p-3">{item.icon}</div>
                </span>
                <h2 className="text-center font-bold">{item.title}</h2>
                <p className="text-muted-foreground text-center">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="w-full py-22 mx-auto flex flex-col justify-center bg-muted/50 px-14">
          <h1 className="text-3xl font-bold mx-auto text-center mt-20">
            What Our User Says
          </h1>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 py-3 mt-20 space-x-5 space-y-5 mb-12 gap-4">
            {testimonial.map((item, index) => (
              <div
                key={index}
                className="h-full w-full bg-[#050505]/80 rounded-xl"
              >
                <Card className="h-full bg-[#050505]/80">
                  <CardContent>
                    <span className="flex justify-center">{item.icon}</span>

                    <div className="flex items-center justify-start space-x-6">
                      <div>
                        <Image
                          className="cursor-pointer h-12 w-auto object-contain rounded-full"
                          src={item.image}
                          alt="logo"
                          width={100}
                          height={100}
                        />
                      </div>
                      <div>
                        <h2 className=" ">{item.author}</h2>
                        <h2 className="text-muted-foreground">{item.role}</h2>
                        <h2 className=" ">{item.company}</h2>
                      </div>
                    </div>

                    <p className="text-muted-foreground relative mt-6">
                      <span className="text-white font-extrabold text-2xl absolute -top-4">
                        &quot;
                      </span>
                      {item.quote}
                      <span className="text-white font-extrabold text-2xl absolute ml-1 -bottom-4">
                        &quot;
                      </span>
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="w-full mx-auto flex flex-col bg-[#050505] px-14 pb-20 pt-12">
          <h1 className="text-3xl font-bold mx-auto text-center mt-20">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground text-center mt-2">
            Find answers to common questions about our platform
          </p>

          <div className="mt-10 flex flex-col ">
            {faqs.map((faq, index) => (
              <Accordion key={index} type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="w-full mx-auto flex flex-col gradient py-16 px-14  ">
          <h1 className="text-3xl text-primary-foreground font-bold mx-auto text-center mt-20">
            Ready To Accelerate Your Career?
          </h1>
          <p className="text-primary-foreground/50 text-center mt-2 max-w-md mx-auto">
            Join thousands of professionals who are advancing their careers with
            Shinkai
          </p>

          <Button
            size={"lg"}
            variant={"secondary"}
            className="mx-auto mt-10 animate-bounce mb-18"
          >
            Start Your Journey Today <ChevronRight />
          </Button>
        </div>
      </section>
    </div>
  );
}
