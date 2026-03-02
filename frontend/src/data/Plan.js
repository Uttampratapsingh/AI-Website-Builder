const plans = [
  {
    key: "free",
    name: "Free",
    price: "₹0",
    credits: 100,
    description: "Perfect to explore GenWeb.ai",
    features: [
      "AI website generation",
      "Responsive HTML output",
      "Basic animations",
    ],
    popular: false,
    button: "Get Started",
  },
  {
    key: "pro",
    name: "Pro",
    price: "₹499",
    credits: 500,
    description: "For serious creators & freelancers",
    features: [
      "Everything in Free",
      "Faster generation",
      "Edit & regenerate",
      "Download source code",
    ],
    popular: true,
    button: "Upgrade to Pro",
  },
  {
    key: "enterprise",
    name: "Enterprise",
    price: "₹1499",
    credits: 2000,
    description: "For teams & power users",
    features: [
      "Unlimited iterations",
      "Highest priority",
      "Team collaboration",
      "Dedicated support",
    ],
    popular: false,
    button: "Contact Sales",
  },
];

export default plans;