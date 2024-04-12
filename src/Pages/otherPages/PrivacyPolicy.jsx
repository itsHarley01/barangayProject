import HeroP from "../../Components/HeroP"
import StaticNavBar from "../../Components/Navigation/StaticNavBar"
import { Link } from 'react-router-dom'

function PrivacyPolicy() {
  return (
    <div>
        <StaticNavBar/>
        <HeroP text='Privacy Policy'/>

        <div className="flex flex-col justify-center m-10 text-left gap-3">
        <body class="bg-gray-100 text-gray-800">
    <header class="bg-blue-500 py-4 mb-8 text-white text-center">
        <h1 class="text-2xl font-bold">Privacy Policy</h1>
    </header>
    <main class="container mx-auto p-4">
        <p>Welcome to Barangay Guadalupe.</p>
        <p>We value your privacy and are committed to protecting your personal information. This <span class="bold-text">Privacy Policy</span> explains how we collect, use, and safeguard your data when you visit <Link to='/services' class="text-blue-500 underline">our Service</Link>.</p>
        <p>By using our Service, you agree to the collection and use of information as described in this policy. Please read this policy carefully to understand how we handle your data.</p>
        <h2 class="text-xl font-bold mt-8 mb-4">Information We Collect</h2>
        <ul>
            <li>Email address</li>
            <li>First and last name</li>
            <li>Phone number</li>
            <li>Address details</li>
            <li>Cookies and Usage Data</li>
        </ul>
        <p>We use this information for purposes such as providing and improving our Service, communicating with you, and ensuring the security of our platform.</p>
        <h2 class="text-xl font-bold mt-8 mb-4">Data Security</h2>
        <p>We employ industry-standard security measures to protect your data. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee its absolute security.</p>
        <h2 class="text-xl font-bold mt-8 mb-4">Your Rights</h2>
        <p>You have the right to report to the Brangangay about your personal information. If you have any questions or requests regarding your data, please contact us at <Link to='/contact' class="text-blue-600 underline">Contact Us</Link>.</p>
        <h2 class="text-xl font-bold mt-8 mb-4">Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we will notify you of significant updates via email or a notice on our Service.</p>
    </main>
    <footer class="bg-blue-500 py-4 text-white text-center">
        <p>If you have any questions or concerns about this Privacy Policy, please contact us at <Link to='/contact' class="text-blue-200 underline">Contact Us</Link>.</p>
    </footer>
</body>

        </div>
    </div>
  )
}

export default PrivacyPolicy