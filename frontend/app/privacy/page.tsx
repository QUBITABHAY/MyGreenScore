'use client';

import { useState } from 'react';
import { Download, Trash2, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/nextjs';

export default function PrivacyPage() {
    const { getToken } = useAuth();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [exporting, setExporting] = useState(false);

    const handleExport = async () => {
        setExporting(true);
        try {
            const token = await getToken();
            if (!token) {
                toast.error('Please sign in');
                return;
            }
            const data = await api.exportData(token);

            // Create downloadable JSON file
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `mygreenscore-data-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            toast.success('Data exported successfully!');
        } catch (error) {
            toast.error('Failed to export data');
            console.error(error);
        } finally {
            setExporting(false);
        }
    };

    const handleDelete = async () => {
        setDeleting(true);
        try {
            const token = await getToken();
            if (!token) {
                toast.error('Please sign in');
                return;
            }
            await api.deleteData(token);
            toast.success('All data deleted successfully');
            setShowDeleteModal(false);

            // Reload page after a short delay
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } catch (error) {
            toast.error('Failed to delete data');
            console.error(error);
            setDeleting(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 bg-linear-to-br from-emerald-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-950 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">
                        Privacy &{' '}
                        <span className="bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                            Data Control
                        </span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-300">
                        Your data, your choice. Manage your information with full transparency.
                    </p>
                </div>

                {/* Privacy Statement */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 mb-8">
                    <div className="flex items-start gap-4">
                        <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0 mt-1" />
                        <div>
                            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                                Your Privacy Matters
                            </h3>
                            <p className="text-sm text-blue-800 dark:text-blue-200">
                                We are committed to protecting your privacy. All your environmental data is stored securely
                                and is never shared with third parties. You have complete control over your information and
                                can export or delete it at any time.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Export Data */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 mb-6">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                            <Download className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold mb-2">Export Your Data</h2>
                            <p className="text-slate-600 dark:text-slate-300 mb-4">
                                Download all your carbon footprint data, goals, preferences, and activity history
                                as a JSON file. You can use this data for your own records or import it elsewhere.
                            </p>
                            <button
                                onClick={handleExport}
                                disabled={exporting}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-emerald-600 to-green-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Download className="w-5 h-5" />
                                {exporting ? 'Exporting...' : 'Export Data'}
                            </button>
                        </div>
                    </div>

                    <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            <div className="text-sm text-emerald-800 dark:text-emerald-200">
                                <div className="font-semibold mb-1">What's included:</div>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>All footprint assessments and calculations</li>
                                    <li>Your sustainability goals and progress</li>
                                    <li>User preferences and settings</li>
                                    <li>Activity history and memory logs</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Delete Data */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border-2 border-red-200 dark:border-red-900">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
                            <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold mb-2">Delete All Data</h2>
                            <p className="text-slate-600 dark:text-slate-300 mb-4">
                                Permanently delete all your data from our systems. This action cannot be undone.
                                We recommend exporting your data first if you want to keep a copy.
                            </p>
                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 hover:-translate-y-0.5 transition-all"
                            >
                                <Trash2 className="w-5 h-5" />
                                Delete All Data
                            </button>
                        </div>
                    </div>

                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                            <div className="text-sm text-red-800 dark:text-red-200">
                                <div className="font-semibold mb-1">Warning:</div>
                                <p>
                                    This will permanently delete all your footprint records, goals, preferences, and
                                    activity history. This action is irreversible and cannot be undone.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-8 animate-fadeIn">
                            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4 shrink-0">
                                <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
                            </div>

                            <h3 className="text-2xl font-bold text-center mb-4">Confirm Deletion</h3>
                            <p className="text-slate-600 dark:text-slate-300 text-center mb-6">
                                Are you absolutely sure you want to delete all your data? This action cannot be undone.
                            </p>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    disabled={deleting}
                                    className="flex-1 px-6 py-3 bg-gray-100 dark:bg-slate-700 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    disabled={deleting}
                                    className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
                                >
                                    {deleting ? 'Deleting...' : 'Yes, Delete All'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
