import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight, Zap, Shield, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built for speed with optimized performance at every layer.",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description: "Enterprise-grade security baked into the foundation.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Monitor everything with beautiful, actionable dashboards.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            Acme
          </span>
          <div className="hidden gap-8 md:flex">
            {["Features", "Pricing", "About"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item}
              </a>
            ))}
          </div>
          <Button size="sm">Get Started</Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.08),transparent_60%)]" />
        <div className="container relative z-10 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-6 inline-block rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-medium tracking-wide text-muted-foreground">
              Now in public beta
            </span>
          </motion.div>
          <motion.h1
            className="mx-auto max-w-4xl font-display text-5xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Build products{" "}
            <span className="text-primary">people love</span>
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            The modern platform for teams who ship fast. From idea to
            production in record time.
          </motion.p>
          <motion.div
            className="mt-10 flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button size="lg" className="gap-2">
              Start Building <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-border bg-card py-24">
        <div className="container">
          <motion.h2
            className="text-center font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            Everything you need
          </motion.h2>
          <motion.p
            className="mx-auto mt-4 max-w-md text-center text-muted-foreground"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
          >
            Powerful features to help you build, launch, and scale.
          </motion.p>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="group rounded-2xl border border-border bg-background p-8 transition-shadow hover:shadow-lg"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 2}
              >
                <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container">
          <motion.div
            className="mx-auto max-w-3xl rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground sm:px-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-primary-foreground/80">
              Join thousands of teams already building with Acme.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="mt-8 gap-2"
            >
              Get Started Free <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="font-display text-lg font-bold text-foreground">
            Acme
          </span>
          <p className="text-sm text-muted-foreground">
            © 2026 Acme Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
