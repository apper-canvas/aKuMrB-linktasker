import { motion } from 'framer-motion'
import { Shield, Users, Download, Trash2, Edit, Eye, Globe, AlertCircle } from 'lucide-react'

function GDPR() {
  const rights = [
    {
      icon: Eye,
      title: "Right to Access",
      content: "You have the right to request copies of your personal data. We may charge a small fee for this service.",
      action: "Request your data within 24 hours via our support team"
    },
    {
      icon: Edit,
      title: "Right to Rectification",
      content: "You have the right to request that we correct any information you believe is inaccurate or incomplete.",
      action: "Update your profile or contact us to correct any errors"
    },
    {
      icon: Trash2,
      title: "Right to Erasure",
      content: "You have the right to request that we erase your personal data under certain conditions.",
      action: "Delete your account and all associated data permanently"
    },
    {
      icon: Download,
      title: "Right to Data Portability",
      content: "You have the right to request transfer of your data to another organization or directly to you.",
      action: "Export your data in JSON or CSV format"
    },
    {
      icon: Shield,
      title: "Right to Object",
      content: "You have the right to object to our processing of your personal data under certain conditions.",
      action: "Opt-out of data processing for marketing purposes"
    },
    {
      icon: AlertCircle,
      title: "Right to Restrict Processing",
      content: "You have the right to request restriction of processing your personal data under certain conditions.",
      action: "Limit how we use your data while maintaining your account"
    }
  ]

  const dataTypes = [
    { type: "Account Information", examples: "Name, email address, password hash", retention: "Until account deletion", legal_basis: "Contract Performance" },
    { type: "Usage Data", examples: "Links created, tasks completed, login times", retention: "2 years", legal_basis: "Legitimate Interest" },
    { type: "Technical Data", examples: "IP address, browser type, device information", retention: "1 year", legal_basis: "Legitimate Interest" },
    { type: "Marketing Data", examples: "Email preferences, communication history", retention: "Until consent withdrawn", legal_basis: "Consent" },
    { type: "Support Data", examples: "Help requests, feedback, correspondence", retention: "3 years", legal_basis: "Legitimate Interest" }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto py-8"
    >
      <div className="mb-8">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="p-3 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Globe size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-surface-800 dark:text-surface-100">
              GDPR Compliance
            </h1>
            <p className="text-surface-600 dark:text-surface-400 mt-1">
              General Data Protection Regulation Compliance • Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </motion.div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
            LinkTasker is committed to protecting your privacy and ensuring compliance with the 
            General Data Protection Regulation (GDPR). This page outlines your rights as a data 
            subject and explains how we process your personal data in accordance with GDPR requirements.
          </p>
        </div>
      </div>

      {/* Your Rights Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-surface-800 dark:text-surface-100 mb-6 flex items-center gap-2">
          <Users size={24} className="text-blue-600 dark:text-blue-400" />
          Your GDPR Rights
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          {rights.map((right, index) => (
            <motion.div
              key={right.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-surface-800 rounded-lg p-6 shadow-sm border border-surface-200 dark:border-surface-700"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex-shrink-0">
                  <right.icon size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-surface-800 dark:text-surface-100 mb-2">
                    {right.title}
                  </h3>
                  <p className="text-surface-600 dark:text-surface-400 text-sm mb-3">
                    {right.content}
                  </p>
                  <div className="bg-surface-50 dark:bg-surface-700 rounded-md p-2">
                    <p className="text-xs text-surface-500 dark:text-surface-400 font-medium">
                      How to exercise: {right.action}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Data Processing Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-surface-800 dark:text-surface-100 mb-6 flex items-center gap-2">
          <Shield size={24} className="text-blue-600 dark:text-blue-400" />
          Data Processing Overview
        </h2>
        
        <div className="bg-white dark:bg-surface-800 rounded-lg shadow-sm border border-surface-200 dark:border-surface-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-50 dark:bg-surface-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                    Data Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                    Examples
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                    Retention Period
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                    Legal Basis
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
                {dataTypes.map((data, index) => (
                  <motion.tr
                    key={data.type}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="hover:bg-surface-50 dark:hover:bg-surface-700/50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-surface-800 dark:text-surface-100">
                      {data.type}
                    </td>
                    <td className="px-6 py-4 text-sm text-surface-600 dark:text-surface-400">
                      {data.examples}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-600 dark:text-surface-400">
                      {data.retention}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                        {data.legal_basis}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* International Transfers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-8"
      >
        <div className="bg-white dark:bg-surface-800 rounded-lg p-6 shadow-sm border border-surface-200 dark:border-surface-700">
          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100 mb-4 flex items-center gap-2">
            <Globe size={20} className="text-blue-600 dark:text-blue-400" />
            International Data Transfers
          </h2>
          <div className="space-y-4 text-surface-600 dark:text-surface-400">
            <p>
              We may transfer your personal data to countries outside the European Economic Area (EEA) 
              for processing and storage. When we do this, we ensure appropriate safeguards are in place:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                <span>Standard Contractual Clauses (SCCs) approved by the European Commission</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                <span>Adequacy decisions for countries with adequate data protection</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                <span>Binding Corporate Rules for intra-group transfers</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Data Breach Notification */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mb-8"
      >
        <div className="bg-white dark:bg-surface-800 rounded-lg p-6 shadow-sm border border-surface-200 dark:border-surface-700">
          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100 mb-4 flex items-center gap-2">
            <AlertCircle size={20} className="text-amber-600 dark:text-amber-400" />
            Data Breach Notification
          </h2>
          <div className="space-y-4 text-surface-600 dark:text-surface-400">
            <p>
              In the unlikely event of a personal data breach that poses a high risk to your rights and freedoms, 
              we will notify you without undue delay and within 72 hours of becoming aware of the breach.
            </p>
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
              <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-2">Our Commitment:</h3>
              <ul className="space-y-1 text-sm text-amber-700 dark:text-amber-400">
                <li>• Immediate containment and assessment of any breach</li>
                <li>• Notification to supervisory authorities within 72 hours</li>
                <li>• Direct notification to affected users when required</li>
                <li>• Full transparency about the nature and scope of the breach</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contact and Complaints */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100 mb-4">
            Exercise Your Rights
          </h2>
          <div className="space-y-3 text-surface-600 dark:text-surface-400">
            <p className="text-sm">Contact our Data Protection Officer:</p>
            <div className="space-y-2 text-sm">
              <p>• Email: dpo@linktasker.com</p>
              <p>• Response time: Within 30 days</p>
              <p>• Languages: English, German, French</p>
              <p>• Verification required for data requests</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100 mb-4">
            File a Complaint
          </h2>
          <div className="space-y-3 text-surface-600 dark:text-surface-400">
            <p className="text-sm">You have the right to lodge a complaint with:</p>
            <div className="space-y-2 text-sm">
              <p>• Your local supervisory authority</p>
              <p>• The Irish Data Protection Commission (our lead authority)</p>
              <p>• Any EU supervisory authority</p>
              <p>• Contact us first - we're here to help resolve issues</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-8 text-center text-sm text-surface-500 dark:text-surface-500"
      >
        <p>
          This GDPR compliance information is regularly updated to reflect changes in regulation 
          and our data processing practices. Last review: {new Date().toLocaleDateString()}
        </p>
      </motion.div>
    </motion.div>
  )
}

export default GDPR