"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";


export default function Privacy() {
  return (
    <div className="h-screen bg-background flex items-center justify-center p-4 ">
      <Card className="w-full max-w-2xl mx-auto max-h-[80vh] flex flex-col mt-4">
        <CardHeader className="py-2 md:py-4">
          <CardTitle className="text-base md:text-xl">
            Privacy Policy for Cypress Resort
          </CardTitle>           
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="prose dark:prose-invert max-w-none text-xs space-y-6">
              <h2 id="scope">Scope</h2>
              <p>This Privacy Policy describes how Thin Spaces, owner of Cypress Resort (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), handles personal information collected through our website, bookings, and interactions. We are a family-owned real estate development company building the next chapter of hospitality in beautiful places. This policy applies to U.S. residents and does not cover employment data or non-personal information.</p>

              <h2 id="notice-at-collection">Notice at Collection</h2>
              <p>We collect limited personal information to serve our guests. Below are examples of what we collect, how we use and share it, and opt-out options. We do not collect sensitive data like Social Security numbers, passports, or financial details beyond what&apos;s needed for bookings.</p>

              <ul className="space-y-4">
                <li>
                  <strong className="text-primary">Contact Information</strong>: Name, email, phone, address.
                  <ul className="list-disc pl-6 space-y-1 mt-1">
                    <li>Collected: From you (e.g., bookings, inquiries); passively (e.g., website visits); from partners (e.g., booking platforms).</li>
                    <li>Used: To manage reservations, communicate, improve services, marketing, legal purposes.</li>
                    <li>Disclosed: Internally; to service providers (e.g., payment processors); business partners; successors; for legal reasons.</li>
                    <li>We may share or sell for marketing. Opt-out: See below.</li>
                  </ul>
                </li>

                <li>
                  <strong className="text-primary">Demographic Information</strong>: Age range, location preferences.
                  <ul className="list-disc pl-6 space-y-1 mt-1">
                    <li>Collected: From you or partners.</li>
                    <li>Used: To understand interests, tailor experiences, marketing.</li>
                    <li>Disclosed: As above.</li>
                    <li>We may share or sell. Opt-out: See below.</li>
                  </ul>
                </li>

                <li>
                  <strong className="text-primary">Booking Information</strong>: Reservation details, preferences, history.
                  <ul className="list-disc pl-6 space-y-1 mt-1">
                    <li>Collected: From you or partners.</li>
                    <li>Used: To fulfill bookings, improve resort, marketing.</li>
                    <li>Disclosed: As above.</li>
                    <li>We may share or sell. Opt-out: See below.</li>
                  </ul>
                </li>

                <li>
                  <strong className="text-primary">User-Provided Content</strong>: Messages, reviews, survey responses.
                  <ul className="list-disc pl-6 space-y-1 mt-1">
                    <li>Collected: From you.</li>
                    <li>Used: To respond, improve, display publicly if applicable.</li>
                    <li>Disclosed: As above, plus on our site/social media.</li>
                  </ul>
                </li>

                <li>
                  <strong className="text-primary">Online Activity</strong>: IP address, browsing history on our site.
                  <ul className="list-disc pl-6 space-y-1 mt-1">
                    <li>Collected: Passively or from partners.</li>
                    <li>Used: To operate site, analytics, marketing.</li>
                    <li>Disclosed: As above.</li>
                    <li>We may share or sell. Opt-out: See below.</li>
                  </ul>
                </li>

                <li>
                  <strong className="text-primary">Inferences</strong>: Preferences based on interactions.
                  <ul className="list-disc pl-6 space-y-1 mt-1">
                    <li>Collected: From data we have.</li>
                    <li>Used: To personalize services, marketing.</li>
                    <li>Disclosed: As above.</li>
                    <li>We may share or sell. Opt-out: See below.</li>
                  </ul>
                </li>
              </ul>

              <p>We retain information as needed for business, legal, or safety reasons, evaluated case-by-case.</p>

              <h2 id="how-we-collect-information"><strong>1. How We Collect Information</strong></h2>
              <ul className="space-y-4">
                <li>
                  Directly from You
                  <ul className="list-disc pl-6 space-y-1 mt-1">
                    <li>Bookings</li>
                    <li>Inquiries</li>
                    <li>Sign-ups</li>
                    <li>Surveys</li>
                    <li>Social media</li>
                  </ul>
                </li>
                <li>
                  Passively
                  <ul className="list-disc pl-6 space-y-1 mt-1">
                    <li>Via cookies</li>
                    <li>Analytics on our site</li>
                  </ul>
                </li>
                <li>
                  From Third Parties
                  <ul className="list-disc pl-6 space-y-1 mt-1">
                    <li>Booking partners</li>
                    <li>Social media</li>
                    <li>Data providers</li>
                  </ul>
                </li>
              </ul>

             <h2 id="how-we-use-information"><strong>2. How We Use Information</strong></h2>
              <ul className="list-disc pl-6 space-y-1 mt-1">
                <li>Manage reservations and guest experiences.</li>
                <li>Communicate (e.g., confirmations, updates).</li>
                <li>Improve resort and website.</li>
                <li>Marketing (e.g., promotions, newsletters).</li>
                <li>Legal/security (e.g., fraud prevention).</li>
                <li>As directed by you or permitted by law.</li>
              </ul>

              <h2 id="how-we-disclose-information"><strong>3. How We Disclose Information</strong></h2>
              <ul className="list-disc pl-6 space-y-1 mt-1">
                <li>Internally within Thin Spaces.</li>
                <li>To service providers (e.g., hosting, payments).</li>
                <li>Business partners (e.g., for joint promotions).</li>
                <li>Successors in business changes.</li>
                <li>For legal reasons (e.g., subpoenas).</li>
                <li>As directed by you.</li>
              </ul>

              <h2 id="your-privacy-rights"><strong>4. Your Privacy Rights</strong></h2>
              <p>Depending on your state (e.g., California under CCPA):</p>
              <ul className="list-disc pl-6 space-y-1 mt-1">
                <li>Know what data we have.</li>
                <li>Delete or correct data.</li>
                <li>Opt-out of sales/sharing: Email us or disable cookies.</li>
                <li>No discrimination for exercising rights.</li>
              </ul>
              <p>Submit requests to: privacy@cypressresort.com. Include name, email, state. We verify identity. Agents: Provide authorization.</p>
              <p>We don&apos;t sell/share data of those under 16.</p>
              <p>California Residents: Ask annually about third-party marketing shares via email (&quot;Shine the Light&quot;).</p>

              <h2 id="financial-incentives">Financial Incentives</h2>
              <p>We may offer discounts for loyalty programs or sign-ups. Opt-out anytime via email. Value relates to benefits provided.</p>

              <h2 id="children-under-18">Children Under 18</h2>
              <p>Our site is for adults. We don&apos;t knowingly collect data from under 18. Contact us if concerned.</p>

              <h2 id="cookies-and-communications">Cookies and Communications</h2>
              <ul className="list-disc pl-6 space-y-1 mt-1">
                <li>Manage cookies via browser settings.</li>
                <li>Opt-out of Google Analytics, etc., via their tools.</li>
                <li>We don&apos;t respond to &quot;Do Not Track&quot; signals.</li>
                <li>Unsubscribe from marketing emails/texts via links or email us.</li>
              </ul>

              <h2 id="security">Security</h2>
              <p>We use reasonable safeguards, but no system is fully secure. Protect your login details.</p>

              <h2 id="storage">Storage</h2>
              <p>Data stored in the U.S. Non-U.S. users consent to transfer.</p>

              <h2 id="links">Links</h2>
              <p>We aren&apos;t responsible for third-party sites.</p>

              <h2 id="contact-us">Contact Us</h2>
              <p>Questions? Email privacy@cypressresort.com.</p>

              <h2 id="changes">Changes</h2>
              <p>We may update this policy. Check here for changes.</p>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}