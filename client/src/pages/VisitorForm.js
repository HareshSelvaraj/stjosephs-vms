import { toast } from 'react-toastify';

const VisitorForm = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    purpose: '',
    whomToMeet: '',
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [visitor, setVisitor] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    
    try {
      const newVisitor = await registerVisitor(formData);
      setVisitor(newVisitor);
      setShowConfirmation(true);
    } catch (error) {
      console.error('Error registering visitor:', error);
      setError('Failed to register visitor. Please try again.');
      toast.error('Failed to register visitor. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  
  if (showConfirmation && visitor) {
    return (
      <div className="max-w-lg mx-auto my-10 p-6 rounded-lg shadow-md text-center">
        <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Registration Successful!</h2>
        <div className={`mb-6 ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'} p-4 rounded-lg`}>
          <p className={`text-lg mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Your Visitor ID: <span className="font-bold">{visitor.visitorId}</span>
          </p>
          <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Please keep this ID for reference during your visit.
          </p>
          <div className={`text-left mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <p><strong>Name:</strong> {visitor.name}</p>
            <p><strong>Purpose:</strong> {visitor.purpose}</p>
            <p><strong>Host:</strong> {visitor.whomToMeet}</p>
          </div>
        </div>
        <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Please proceed to the reception desk upon arrival.
        </p>
        <button
          onClick={() => {
            setShowConfirmation(false);
            setFormData({
              name: '',
              email: '',
              phone: '',
              purpose: '',
              whomToMeet: '',
            });
            setVisitor(null);
          }}
          className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
        >
          Register Another Visitor
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto my-10 p-6 rounded-lg shadow-md">
      <h2 className={`text-2xl font-bold mb-6 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        Visitor Registration
      </h2>

      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Form fields remain unchanged */}
        // ... existing code ...
      </form>
    </div>
  );
};

export default VisitorForm; 