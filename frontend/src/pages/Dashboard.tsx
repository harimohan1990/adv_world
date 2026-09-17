import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import Navbar from '../components/Navbar';
import { Building, Megaphone, Loader2 } from 'lucide-react';

export default function Dashboard() {
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Form states
  const [companyName, setCompanyName] = useState('');
  const [companyDesc, setCompanyDesc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const compRes = await api.get('/companies/me');
        setCompany(compRes.data);
      } catch (err: any) {
        if (err.response?.status === 404) {
          // No company yet
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const handleCreateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await api.post('/companies/', {
        name: companyName,
        description: companyDesc
      });
      setCompany(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand-purple animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Advertiser Dashboard</h1>
          <p className="text-gray-400">Manage your brand presence and advertising campaigns.</p>
        </div>

        {!company ? (
          <div className="glass p-8 rounded-2xl border border-dark-border max-w-2xl mx-auto mt-12">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-brand-purple/20 text-brand-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold">Register Your Company</h2>
              <p className="text-gray-400 mt-2">You need to set up a company profile before launching campaigns.</p>
            </div>
            
            <form onSubmit={handleCreateCompany} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Company Name</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-base border border-dark-border rounded-xl focus:ring-2 focus:ring-brand-purple text-white"
                  placeholder="Acme Corp"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={companyDesc}
                  onChange={e => setCompanyDesc(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-base border border-dark-border rounded-xl focus:ring-2 focus:ring-brand-purple text-white h-32"
                  placeholder="What does your company do?"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-brand-purple hover:bg-brand-pink transition-colors rounded-xl font-medium text-white flex justify-center"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Register Company'}
              </button>
            </form>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="glass p-6 rounded-2xl border border-dark-border">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Building className="text-brand-purple" />
                  Your Profile
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Company Name</p>
                    <p className="font-medium text-lg">{company.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/50 text-green-400 border border-green-800">
                      {company.is_approved ? 'Approved' : 'Pending Review'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Description</p>
                    <p className="text-gray-300">{company.description || 'No description provided.'}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Megaphone className="text-brand-pink" />
                  Your Campaign Requests
                </h3>
              </div>
              
              <div className="glass p-6 rounded-2xl border border-dark-border mb-8">
                <h4 className="font-bold mb-4">Request New Campaign</h4>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Campaign Title"
                    className="w-full px-4 py-2 bg-dark-base border border-dark-border rounded-lg"
                    id="reqTitle"
                  />
                  <textarea
                    placeholder="Describe your target audience and requirements"
                    className="w-full px-4 py-2 bg-dark-base border border-dark-border rounded-lg h-24"
                    id="reqDesc"
                  />
                  <input
                    type="number"
                    placeholder="Budget ($)"
                    className="w-full px-4 py-2 bg-dark-base border border-dark-border rounded-lg"
                    id="reqBudget"
                  />
                  <button 
                    onClick={async () => {
                      try {
                        await api.post('/campaigns/', {
                          title: (document.getElementById('reqTitle') as HTMLInputElement).value,
                          description: (document.getElementById('reqDesc') as HTMLInputElement).value,
                          budget: parseFloat((document.getElementById('reqBudget') as HTMLInputElement).value) || 0,
                          start_date: new Date().toISOString(),
                          end_date: new Date(Date.now() + 30*24*60*60*1000).toISOString()
                        });
                        alert("Requirement submitted!");
                        (document.getElementById('reqTitle') as HTMLInputElement).value = '';
                        (document.getElementById('reqDesc') as HTMLInputElement).value = '';
                        (document.getElementById('reqBudget') as HTMLInputElement).value = '';
                      } catch (e) {
                        alert("Error submitting requirement");
                      }
                    }}
                    className="bg-brand-pink text-white px-4 py-2 rounded-lg"
                  >
                    Submit Requirement to Admin
                  </button>
                </div>
              </div>

              <div className="glass p-12 rounded-2xl border border-dark-border text-center">
                <Megaphone className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-300 mb-2">Check back later</h4>
                <p className="text-gray-500 max-w-sm mx-auto">
                  Once the admin approves your requirement, your active campaigns and offers will appear here.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
