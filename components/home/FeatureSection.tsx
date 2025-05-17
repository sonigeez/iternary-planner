import { MapPin, Clock, Route, Compass, Award, Book } from 'lucide-react';

const features = [
  {
    icon: <Clock className="h-10 w-10 text-chart-1" />,
    title: "Time-Based Adventures",
    description: "Choose adventures that fit your schedule, from quick 1-hour explorations to full-day journeys."
  },
  {
    icon: <Route className="h-10 w-10 text-chart-2" />,
    title: "Multi-Modal Transport",
    description: "Seamlessly combine walking, public transit, and driving for the perfect urban exploration."
  },
  {
    icon: <Book className="h-10 w-10 text-chart-3" />,
    title: "Narrative Storylines",
    description: "Experience cohesive journeys with themed narratives that connect each location."
  },
  {
    icon: <MapPin className="h-10 w-10 text-chart-4" />,
    title: "Hidden Gems",
    description: "Discover local secrets and overlooked spots that typical tourist guides miss."
  },
  {
    icon: <Award className="h-10 w-10 text-chart-5" />,
    title: "Digital Passport",
    description: "Collect digital stamps for each adventure completed and track your exploration progress."
  },
  {
    icon: <Compass className="h-10 w-10 text-primary" />,
    title: "Personalized Recommendations",
    description: "Get adventure suggestions tailored to your interests and past explorations."
  }
];

export default function FeatureSection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Turn Everyday Spaces Into Adventures</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our unique approach transforms how you experience your city through thoughtfully crafted adventures.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-background rounded-lg p-6 shadow-sm border transition-all duration-300 hover:shadow-md"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}