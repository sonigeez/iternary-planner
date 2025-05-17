import { Circle, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: "01",
    title: "Choose Your Time",
    description: "Select how much time you have available for your adventure."
  },
  {
    number: "02",
    title: "Set Preferences",
    description: "Pick your interests, transportation modes, and adventure theme."
  },
  {
    number: "03",
    title: "Generate Adventure",
    description: "We'll create a unique narrative-driven journey through your city."
  },
  {
    number: "04",
    title: "Explore & Collect",
    description: "Follow the adventure path and collect passport stamps along the way."
  }
];

export default function HowItWorksSection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Creating and experiencing your Micro-Adventure is simple, intuitive, and flexible.
          </p>
        </div>
        
        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-border hidden md:block" />
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="md:grid md:grid-cols-5 items-start relative">
                <div className="md:col-span-1 flex items-center mb-4 md:mb-0">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center relative z-10">
                    <span className="font-bold">{step.number}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="h-6 w-6 text-muted-foreground hidden md:block mx-4" />
                  )}
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}