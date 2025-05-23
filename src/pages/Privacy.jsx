import { motion } from 'framer-motion'
import { Shield, Lock, Eye, Database, Users, Mail } from 'lucide-react'

function Privacy() {
  const sections = [
    {
      icon: Eye,
      title: "Information We Collect",
      content: [
        "Personal information you provide when creating tasks and links",
        "Usage data to improve our service performance",
        "Device information for optimal app functionality",
        "Cookies and similar tracking technologies"
      ]
    },
    {
      icon: Database,
      title: "How We Use Your Information",
      content: [
        "To provide and maintain our LinkTasker service",
        "To notify you about changes to our service",
        "To provide customer support when needed",
        "To analyze usage patterns and improve user experience"
      ]
    },
    {
      icon: Lock,
      title: "Data Security",
      content: [
        "We use industry-standard encryption to protect your data",
        "Regular security audits and vulnerability assessments",
        "Secure data centers with restricted access",
        "Your data is never sold to third parties"
      ]
    },
    {
      icon: Users,
      title: "Data Sharing",
      content: [
        "We do not sell your personal information to advertisers",
        "Data may be shared with service providers under strict agreements",
        "Legal compliance may require disclosure when mandated by law",
        "Anonymous analytics may be shared to improve our services"
      ]
    },
    {
      icon: Mail,
      title: "Your Rights",
      content: [
        "Access and review your personal data at any time",
        "Request correction of inaccurate information",
        "Delete your account and associated data",
        "Opt-out of marketing communications"
      ]
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto py-8"
    >
      <div className="mb-8">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            <Shield size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-surface-800 dark:text-surface-100">
              Privacy Policy
            </h1>
            <p className="text-surface-600 dark:text-surface-400 mt-1">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </motion.div>
        
        <div className="bg-surface-100 dark:bg-surface-800 rounded-lg p-6 border border-surface-200 dark:border-surface-700">
          <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
            At LinkTasker, we take your privacy seriously. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you use our task management and link 
            organization service. Please read this privacy policy carefully.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white dark:bg-surface-800 rounded-lg p-6 shadow-sm border border-surface-200 dark:border-surface-700"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                <section.icon size={24} />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100 mb-3">
                  {section.title}
                </h2>
                <ul className="space-y-2">
                  {section.content.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-surface-600 dark:text-surface-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-8 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-6 border border-surface-200 dark:border-surface-700"
      >
        <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100 mb-3">
          Contact Us About Privacy
        </h2>
        <p className="text-surface-600 dark:text-surface-400 mb-4">
          If you have any questions about this Privacy Policy or our data practices, please contact us:
        </p>
        <div className="space-y-2 text-surface-700 dark:text-surface-300">
          <p>• Email: privacy@linktasker.com</p>
          <p>• Response time: Within 48 hours</p>
          <p>• Data Protection Officer available for EU residents</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-6 text-center text-sm text-surface-500 dark:text-surface-500"
      >
        <p>
          This privacy policy is effective as of the date stated above and will remain in effect 
          except with respect to any changes in its provisions in the future.
        </p>
      </motion.div>
    </motion.div>
  )
}

export default Privacy