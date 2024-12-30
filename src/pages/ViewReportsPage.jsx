import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import Header from '../components/Header';
import ReportItem from '../components/ReportItem';

function ViewReportsPage(props) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReports = async () => {
    setLoading(true);
    const {
      data: { session },
    } = await supabase.auth.getSession();
    try {
      const response = await fetch('/api/getReports', {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setReports(data);
      } else {
        const errorData = await response.json();
        console.error('Error fetching reports:', errorData.error);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    props.setUser(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-6xl mx-auto">
        <Header onSignOut={handleSignOut} />
        {loading ? (
          <p>Loading reports...</p>
        ) : (
          <div className="space-y-8">
            {reports.length === 0 ? (
              <p>No saved reports found.</p>
            ) : (
              reports.map((report) => (
                <ReportItem key={report.id} report={report} />
              ))
            )}
          </div>
        )}
      </div>
      <a
        href="https://www.zapt.ai"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted text-sm mt-8 block text-center hover:underline cursor-pointer"
      >
        Made on ZAPT
      </a>
    </div>
  );
}

export default ViewReportsPage;