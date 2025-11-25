import { useState } from 'react';
import { Search, ChevronDown, MessageSquare, Mail, Phone, ExternalLink } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function HelpSupport() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      category: 'Getting Started',
      faqs: [
        {
          question: 'How do I register as a volunteer?',
          answer:
            'Click on the Register button, select "Volunteer" as your role, and fill in your details including your skills and interests. You\'ll receive a confirmation email once registered.',
        },
        {
          question: 'How do NGOs verify their organization?',
          answer:
            'NGOs need to provide their registration documents and official information during signup. Our team reviews and verifies all NGO applications within 2-3 business days.',
        },
      ],
    },
    {
      category: 'Events & Opportunities',
      faqs: [
        {
          question: 'How do I find volunteer opportunities?',
          answer:
            'Navigate to the Opportunities page where you\'ll see personalized recommendations based on your skills. You can also search and filter by category, location, and time commitment.',
        },
        {
          question: 'Can I cancel my event registration?',
          answer:
            'Yes, you can cancel your registration from the My Bookings page. Please cancel at least 24 hours before the event to allow others to join.',
        },
      ],
    },
    {
      category: 'Donations',
      faqs: [
        {
          question: 'Is my donation secure?',
          answer:
            'Yes, all donations are processed through secure UPI gateways. 100% of your donation goes directly to the NGO, and you\'ll receive a receipt for tax purposes.',
        },
        {
          question: 'Can I donate anonymously?',
          answer:
            'Yes, during the donation process, you can toggle the "Donate Anonymously" option. Your name won\'t be displayed to the NGO if you choose this option.',
        },
      ],
    },
  ];

  return (
    <Layout userRole="volunteer" menuOpen={menuOpen} onMenuToggle={() => setMenuOpen(!menuOpen)}>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold mb-2">Help & Support</h1>
          <p className="text-muted-foreground">
            Find answers to your questions or get in touch with us
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Quick Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
            <MessageSquare className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold mb-1">Live Chat</h3>
            <p className="text-sm text-muted-foreground">Chat with our support team</p>
          </Card>
          <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
            <Mail className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold mb-1">Email Support</h3>
            <p className="text-sm text-muted-foreground">support@ngoconnect.org</p>
          </Card>
          <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
            <Phone className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold mb-1">Call Us</h3>
            <p className="text-sm text-muted-foreground">+91 1800-123-4567</p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="faq" className="space-y-6">
          <TabsList>
            <TabsTrigger value="faq">FAQs</TabsTrigger>
            <TabsTrigger value="guides">User Guides</TabsTrigger>
            <TabsTrigger value="contact">Contact Form</TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="space-y-6">
            {faqCategories.map((category) => (
              <div key={category.category}>
                <h3 className="font-semibold text-lg mb-3">{category.category}</h3>
                <Accordion type="single" collapsible className="space-y-2">
                  {category.faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                      <AccordionTrigger className="hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="guides">
            <div className="space-y-4">
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">Getting Started as a Volunteer</h3>
                    <p className="text-sm text-muted-foreground">
                      Complete guide to registering and finding opportunities
                    </p>
                  </div>
                  <ExternalLink className="h-5 w-5 text-muted-foreground" />
                </div>
              </Card>
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">NGO Onboarding Guide</h3>
                    <p className="text-sm text-muted-foreground">
                      How to create events and manage volunteers
                    </p>
                  </div>
                  <ExternalLink className="h-5 w-5 text-muted-foreground" />
                </div>
              </Card>
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">Making Donations</h3>
                    <p className="text-sm text-muted-foreground">
                      Step-by-step guide to supporting causes
                    </p>
                  </div>
                  <ExternalLink className="h-5 w-5 text-muted-foreground" />
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contact">
            <Card className="p-6">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Account Issue</option>
                    <option>Feedback</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Describe your issue or question..."
                    rows={5}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Submit Request
                </Button>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
