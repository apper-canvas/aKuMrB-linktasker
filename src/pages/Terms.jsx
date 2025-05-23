import { motion } from 'framer-motion'
import { FileText, Users, AlertTriangle, Scale, Gavel, Shield } from 'lucide-react'

function Terms() {
  const sections = [
    {
      icon: FileText,
      title: "Acceptance of Terms",
      content: [
        "By accessing and using LinkTasker, you accept and agree to these terms",
        "These terms constitute a legally binding agreement between you and LinkTasker",
        "If you do not agree to these terms, please do not use our service",
        "We may update these terms from time to time with notice to users"
      ]
    },
    {
      icon: Users,
      title: "User Responsibilities",
      content: [
        "You must provide accurate and complete information when using our service",
        "You are responsible for maintaining the security of your account",
        "You must not use our service for illegal or unauthorized purposes",
        "You must respect other users and not engage in harmful behavior"
      ]
    },
    {
      icon: Shield,
      title: "Service Availability",
      content: [
        "We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service",
        "Planned maintenance will be announced in advance when possible",
        "We reserve the right to modify or discontinue features with notice",
        "Emergency maintenance may occur without prior notice"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Prohibited Activities",
      content: [
        "Attempting to hack, reverse engineer, or compromise our systems",
        "Uploading malicious content or spam to our platform",
        "Violating intellectual property rights of others",
        "Creating multiple accounts to circumvent limitations"
      ]
    },
    {
      icon: Scale,
      title: "Limitation of Liability",
      content: [
        "LinkTasker is provided 'as is' without warranties of any kind",
        "We are not liable for indirect, incidental, or consequential damages",
        "Our total liability is limited to the amount you paid for the service",
        "Some jurisdictions may not allow these limitations"
      ]
    },
    {
      icon: Gavel,
      title: "Dispute Resolution",
      content: [
        "Any disputes will be resolved through binding arbitration",
        "You waive the right to participate in class action lawsuits",
        "Arbitration will be conducted under established arbitration rules",
        "Small claims court remains available for qualifying disputes"
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
          <div className="p-3 rounded-full bg-secondary/10 text-secondary">
            <FileText size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-surface-800 dark:text-surface-100">
              Terms of Service
            </h1>
            <p className="text-surface-600 dark:text-surface-400 mt-1">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </motion.div>
        
        <div className="bg-surface-100 dark:bg-surface-800 rounded-lg p-6 border border-surface-200 dark:border-surface-700">
          <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
            Welcome to LinkTasker! These Terms of Service ("Terms") govern your use of our task 
            management and link organization platform. By using LinkTasker, you agree to be bound 
            by these Terms. Please read them carefully.
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
              <div className="p-2 rounded-lg bg-secondary/10 text-secondary flex-shrink-0">
                <section.icon size={24} />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100 mb-3">
                  {section.title}
                </h2>
                <ul className="space-y-2">
                  {section.content.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-surface-600 dark:text-surface-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
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
        className="mt-8 bg-gradient-to-r from-secondary/5 to-primary/5 rounded-lg p-6 border border-surface-200 dark:border-surface-700"
      >
        <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100 mb-3">
          Account Termination
        </h2>
        <div className="space-y-3 text-surface-600 dark:text-surface-400">
          <p>
            We reserve the right to terminate or suspend your account if you violate these Terms. 
            You may also terminate your account at any time by contacting our support team.
          </p>
          <p>
            Upon termination, your data will be retained for 30 days before permanent deletion, 
            unless required by law to retain it longer.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-6 border border-surface-200 dark:border-surface-700"
      >
        <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100 mb-3">
          Contact Information
        </h2>
        <p className="text-surface-600 dark:text-surface-400 mb-4">
          Questions about these Terms of Service? We're here to help:
        </p>
        <div className="space-y-2 text-surface-700 dark:text-surface-300">
          <p>• Email: legal@linktasker.com</p>
          <p>• Support: support@linktasker.com</p>
          <p>• Response time: Within 24 hours for legal inquiries</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-6 text-center text-sm text-surface-500 dark:text-surface-500"
      >
        <p>
          By continuing to use LinkTasker after any changes to these Terms, 
          you accept the modified Terms of Service.
        </p>
      </motion.div>
    </motion.div>
  )
}

export default Terms