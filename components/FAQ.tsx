import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'How quickly can you deploy AI solutions in our environment?',
    answer: 'Our packaged solutions can be deployed in as little as 4 weeks, depending on the complexity and level of customization required. We use a proven implementation methodology that includes discovery, configuration, integration, testing, and deployment phases. For custom solutions, we provide a detailed timeline during the initial consultation.'
  },
  {
    question: 'How do you ensure data security and privacy?',
    answer: 'We implement enterprise-grade security measures including end-to-end encryption, secure API endpoints, and role-based access control. Our solutions comply with major security standards and regulations (GDPR, HIPAA, SOC 2). We also provide data residency options and can deploy in your private cloud environment if required.'
  },
  {
    question: 'Can your AI solutions integrate with our existing systems?',
    answer: 'Yes, our solutions are built with integration in mind. We support standard enterprise integration patterns, REST APIs, and major middleware platforms. We have experience integrating with ERP systems, CRM platforms, and custom applications. Our team will work with your IT department to ensure seamless integration.'
  },
  {
    question: 'What kind of ROI can we expect from implementing your AI solutions?',
    answer: 'Our clients typically see ROI within 6-12 months of deployment. Common benefits include 40-60% reduction in operational costs, 70% faster processing times, and 24/7 availability. We provide detailed ROI calculations during the discovery phase and implement tracking metrics to measure success.'
  },
  {
    question: 'How do you handle AI model training and maintenance?',
    answer: 'Our solutions come with pre-trained models that are continuously improved through federated learning. We provide regular model updates and performance monitoring. For custom solutions, we can train models on your specific data while ensuring data privacy and security.'
  },
  {
    question: 'What support and maintenance do you provide?',
    answer: 'We offer 24/7 enterprise support with guaranteed response times based on issue severity. Our support includes monitoring, troubleshooting, performance optimization, and regular updates. We also provide training for your team and detailed documentation.'
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
            Common Questions
          </h2>
          <p className="text-lg text-black/70 dark:text-white/70">
            Expert answers to your AI implementation questions
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-gray-200 dark:border-white/10 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-4 text-left bg-white/50 dark:bg-zinc-900/50 hover:bg-white/80 dark:hover:bg-zinc-900/80 transition-colors"
              >
                <span className="text-lg font-medium text-black dark:text-white">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-black/60 dark:text-white/60 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 bg-gray-50 dark:bg-zinc-900/30"
                >
                  <p className="text-black/70 dark:text-white/70 leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}