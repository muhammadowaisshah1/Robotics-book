import { motion } from "framer-motion";
import { bookInfo } from "@/data/bookContent";
import { BookOpen, ArrowRight, Cpu, Bot, Brain, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-robot.jpg";

interface BookCoverProps {
  onStartReading: () => void;
}

const features = [
  { icon: <Cpu className="h-6 w-6" />, label: "ROS 2", desc: "Robot Operating System" },
  { icon: <Bot className="h-6 w-6" />, label: "Gazebo & Unity", desc: "Digital Twin Simulation" },
  { icon: <Brain className="h-6 w-6" />, label: "NVIDIA Isaac", desc: "AI Robot Platform" },
  { icon: <Zap className="h-6 w-6" />, label: "VLA Models", desc: "Vision-Language-Action" },
];

const BookCover = ({ onStartReading }: BookCoverProps) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Humanoid Robot"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="container mx-auto px-6 py-20 lg:px-12">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2"
            >
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">{bookInfo.edition}</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4"
            >
              <span className="text-gradient-gold">{bookInfo.title.split('&')[0]}</span>
              <br />
              <span className="text-foreground">&{bookInfo.title.split('&')[1]}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground mb-6 font-heading"
            >
              {bookInfo.subtitle}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-foreground/80 mb-8 max-w-2xl leading-relaxed"
            >
              {bookInfo.description}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Button
                size="lg"
                onClick={onStartReading}
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 rounded-xl glow-shadow"
              >
                Start Reading
                <ArrowRight className="h-5 w-5" />
              </Button>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-4 hover:border-primary/50 transition-colors"
                >
                  <div className="text-primary mb-2">{feature.icon}</div>
                  <p className="font-heading font-semibold text-foreground">{feature.label}</p>
                  <p className="text-xs text-muted-foreground">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </div>
  );
};

export default BookCover;
