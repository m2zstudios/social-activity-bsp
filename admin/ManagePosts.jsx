import { useSettings } from "../Context/SettingsContext";
import "./Stylings/Manage.css";

const Manage = () => {
  const { settings, setSettings } = useSettings();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    setSettings((prev) => ({
      ...prev,
      [e.target.name]: url,
    }));
  };

  const handleSave = async () => {
    console.log("Saved:", settings);
  };

  return (
    <div className="manage-container">
      <h1 className="manage-title">Site Management</h1>

      <div className="manage-form">
        <div className="manage-group">
          <label>Site Title</label>
          <input
            type="text"
            name="siteTitle"
            value={settings.siteTitle}
            onChange={handleChange}
          />
        </div>

        <div className="manage-group">
          <label>Site Description</label>
          <textarea
            name="siteDescription"
            value={settings.siteDescription}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div className="manage-group">
          <label>Favicon</label>
          <input
            type="file"
            name="favicon"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <div className="manage-group">
          <label>Site Logo</label>
          <input
            type="file"
            name="logo"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <div className="manage-group manage-color">
          <label>Theme Color</label>
          <input
            type="color"
            name="themeColor"
            value={settings.themeColor}
            onChange={handleChange}
          />
        </div>

        <div className="manage-toggle">
          <input
            type="checkbox"
            name="maintenanceMode"
            checked={settings.maintenanceMode}
            onChange={handleChange}
          />
          <span>Enable Maintenance Mode</span>
        </div>

        <button className="manage-save-btn" onClick={handleSave}>
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Manage;
