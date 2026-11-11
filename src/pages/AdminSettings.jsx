
import { useEffect, useState } from 'react';

function AdminSettings() {

    // Default moderation settings
    const defaultSettings = {
        recipeSubmissions: true,
        reviewsEnabled: true,
        reviewReports: true,
        automaticApproval: false
    };

    // Load saved settings from localStorage
    const [settings, setSettings] = useState(() => {
        const savedSettings = localStorage.getItem('recipe-admin-settings');

        if (savedSettings) {
            try {
                return {
                    ...defaultSettings,
                    ...JSON.parse(savedSettings)
                };
            } catch {
                return defaultSettings;
            }
        }

        return defaultSettings;
    });

    const [message, setMessage] = useState('');

    // Save settings whenever they change
    useEffect(() => {
        localStorage.setItem(
            'recipe-admin-settings',
            JSON.stringify(settings)
        );
    }, [settings]);

    // Handle setting changes
    function handleToggle(settingName) {

        setSettings((previousSettings) => ({
            ...previousSettings,
            [settingName]: !previousSettings[settingName]
        }));

        setMessage('Settings updated successfully!');
    }

    // Reset settings
    function handleReset() {

        setSettings(defaultSettings);
        setMessage('Settings restored to default values!');
    }

    return (

        <div className="admin-settings-page">

            <div className="admin-settings-card">

                <h1>Admin Moderation Settings</h1>

                <p>
                    Manage recipe submissions and review moderation options.
                </p>

                {/* Recipe Submission Setting */}
                <div className="setting-item">

                    <div>
                        <h3>Recipe Submissions</h3>

                        <p>
                            Allow registered users to submit new recipes.
                        </p>
                    </div>

                    <label className="setting-switch">
                        <input
                            type="checkbox"
                            checked={settings.recipeSubmissions}
                            onChange={() =>
                                handleToggle('recipeSubmissions')
                            }
                        />
                        <span className="setting-slider"></span>
                    </label>

                </div>

                {/* Reviews Setting */}
                <div className="setting-item">

                    <div>
                        <h3>Enable Reviews</h3>

                        <p>
                            Allow users to write reviews on recipes.
                        </p>
                    </div>

                    <label className="setting-switch">
                        <input
                            type="checkbox"
                            checked={settings.reviewsEnabled}
                            onChange={() =>
                                handleToggle('reviewsEnabled')
                            }
                        />
                        <span className="setting-slider"></span>
                    </label>

                </div>

                {/* Review Reports Setting */}
                <div className="setting-item">

                    <div>
                        <h3>Review Reporting</h3>

                        <p>
                            Allow users to report inappropriate reviews.
                        </p>
                    </div>

                    <label className="setting-switch">
                        <input
                            type="checkbox"
                            checked={settings.reviewReports}
                            onChange={() =>
                                handleToggle('reviewReports')
                            }
                        />
                        <span className="setting-slider"></span>
                    </label>

                </div>

                {/* Automatic Approval Setting */}
                <div className="setting-item">

                    <div>
                        <h3>Automatic Recipe Approval</h3>

                        <p>
                            Demo setting for automatic recipe approval.
                            Keep disabled to use moderator approval.
                        </p>
                    </div>

                    <label className="setting-switch">
                        <input
                            type="checkbox"
                            checked={settings.automaticApproval}
                            onChange={() =>
                                handleToggle('automaticApproval')
                            }
                        />
                        <span className="setting-slider"></span>
                    </label>

                </div>

                {/* Message */}
                {message && (
                    <p className="settings-success" role="status">
                        {message}
                    </p>
                )}

                {/* Reset Button */}
                <button
                    type="button"
                    className="reset-settings-btn"
                    onClick={handleReset}
                >
                    Reset Default Settings
                </button>

                <p className="settings-note">
                    These are frontend demo settings saved in your browser.
                    They do not yet control backend permissions or moderation.
                </p>

            </div>

        </div>
    );
}

export default AdminSettings;
