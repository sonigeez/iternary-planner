import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { StarIcon } from "lucide-react";

const testimonials = [
  {
    name: "Alex Johnson",
    avatar: "/avatars/alex.jpg",
    role: "Local Explorer",
    content: "I've lived in Chicago for 10 years and Micro-Adventure helped me discover neighborhoods I never knew existed. The themed storylines make exploration so much more engaging!",
    location: "Chicago, IL"
  },
  {
    name: "Maya Patel",
    avatar: "/avatars/maya.jpg",
    role: "Weekend Traveler",
    content: "Used this during a 48-hour trip to Seattle and it created the perfect 4-hour adventure that hit all the right spots without feeling rushed. The passport feature is addictive!",
    location: "Seattle, WA"
  },
  {
    name: "Thomas Wilson",
    avatar: "/avatars/thomas.jpg",
    role: "Family Dad",
    content: "Our family used Micro-Adventure to explore our own city on a staycation. The kids loved collecting the digital passport stamps and learning the history behind places we pass every day.",
    location: "Boston, MA"
  }
];

export default function TestimonialSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Adventure Stories</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how others are using Micro-Adventure to rediscover their cities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border shadow-sm hover:shadow-md transition-all">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">"{testimonial.content}"</p>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} size={14} className="fill-chart-4 text-chart-4" />
                    ))}
                  </div>
                  {testimonial.location}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}