"use client";

import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { FileText, Upload, Clock } from "lucide-react";
import { formatDate } from "../lib/utils";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [recentDocuments, setRecentDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.displayName !== username) {
      navigate("/unauthorized");
    }
  }, [user, username, navigate]);

  useEffect(() => {
    const fetchRecentDocuments = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const mockDocuments = [
          { id: "1", title: "Employment Contract", uploadDate: new Date(Date.now() - 86400000 * 2), status: "analyzed", riskScore: 75 },
          { id: "2", title: "Non-Disclosure Agreement", uploadDate: new Date(Date.now() - 86400000 * 5), status: "analyzed", riskScore: 30 },
          { id: "3", title: "Service Agreement", uploadDate: new Date(Date.now() - 86400000 * 7), status: "analyzed", riskScore: 55 },
        ];
        setRecentDocuments(mockDocuments);
      } catch (error) {
        console.error("Error fetching documents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentDocuments();
  }, []);

  const getRiskColor = (score) => (
    score < 40 ? "text-green-500" : score < 70 ? "text-yellow-500" : "text-red-500"
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#F5EEDC] via-[#f9f5ef] to-white p-6">
      <div className="container mx-auto px-4 py-10">
        {/* Welcome Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to LegalSutra, {username}!</h1>
          <p className="text-gray-600 text-lg">Your AI-powered legal document analysis platform</p>
        </div>

        {/* Upload Card */}
        <div className="grid grid-cols-1 mb-12">
          <Card className="w-full max-w-2xl mx-auto text-center shadow-md">
            <CardHeader className="flex flex-col items-center justify-center pb-2">
              <Upload className="h-10 w-10 text-indigo-500 mb-4" />
              <CardTitle className="text-2xl font-semibold">Upload Document</CardTitle>
            </CardHeader>
            <CardContent className="px-6">
              <p className="text-sm text-gray-500">
                Upload your legal documents for AI-powered analysis and risk assessment.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center pb-6">
              <Link to={`/upload/${username}`} className="w-full max-w-xs">
                <Button variant="primary" className="w-full">Upload Now</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        {/* Recent Documents Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6 text-center md:text-left">Recent Documents</h2>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : recentDocuments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentDocuments.map((doc) => (
                <Card key={doc.id} className="overflow-hidden shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{doc.title}</CardTitle>
                    <CardDescription className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-2" />
                      {formatDate(doc.uploadDate)}
                    </CardDescription>
                  </CardHeader>

                  <CardFooter className="flex justify-between px-6 pb-4">
                    <Link to={`/summary/${username}/${doc.id}`}>
                      <Button variant="outline" size="sm">View Summary</Button>
                    </Link>
                    <Button>Download Complete Report</Button>
                    <Link to={`/analysis/${username}/${doc.id}`}>
                      <Button variant="primary" size="sm">Risk Analysis</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-gray-50">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mb-6" />
                <p className="text-gray-500 text-center mb-6 text-lg">No documents found</p>
                <Link to={`/upload/${username}`}>
                  <Button variant="primary">Upload Your First Document</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
