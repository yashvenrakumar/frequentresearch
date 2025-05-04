import React from 'react';

interface SummaryProps {
  data: {
    profilePhoto: File | null;
    username: string;
    profession: string;
    companyName: string;
    country: string;
    state: string;
    city: string;
    subscriptionPlan: string;
    newsletter: boolean;
  };
  onBack: () => void;
  onSubmit: () => void;
}

const Summary: React.FC<SummaryProps> = ({ data, onBack, onSubmit }) => {
  return (
    <div>
      <h2>Summary</h2>
      <div>
        <strong>Username:</strong> {data.username}
      </div>
      <div>
        <strong>Profession:</strong> {data.profession}
      </div>
      {data.profession === 'Entrepreneur' && (
        <div>
          <strong>Company Name:</strong> {data.companyName}
        </div>
      )}
      <div>
        <strong>Country:</strong> {data.country}
      </div>
      <div>
        <strong>State:</strong> {data.state}
      </div>
      <div>
        <strong>City:</strong> {data.city}
      </div>
      <div>
        <strong>Subscription Plan:</strong> {data.subscriptionPlan}
      </div>
      <div>
        <strong>Newsletter:</strong> {data.newsletter ? 'Subscribed' : 'Not Subscribed'}
      </div>
      <div>
        <strong>Profile Photo:</strong>
        {data.profilePhoto && (
          <div>
            <img
              src={URL.createObjectURL(data.profilePhoto)}
              alt="Profile"
              width="100"
              height="100"
            />
          </div>
        )}
      </div>
      <div className="navigation-buttons">
        <button type="button" onClick={onBack}>
          Back
        </button>
        <button type="button" onClick={onSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Summary;
