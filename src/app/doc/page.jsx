import React from 'react';
import apiData from '@/data/apiRef.json';

const ApiReference = () => {
  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-semibold mb-4">API Reference</h2>

      {apiData.endpoints.map((endpoint, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">{endpoint.name}</h3>
          <p className="text-gray-600 mb-4">{endpoint.description}</p>
          <code className="bg-gray-100 p-2 block mb-4">{`${endpoint.method} ${endpoint.path}`}</code>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border border-gray-300">Parameter</th>
                <th className="p-2 border border-gray-300">Type</th>
                <th className="p-2 border border-gray-300">Description</th>
              </tr>
            </thead>
            <tbody>
              {endpoint.parameters.map((parameter, paramIndex) => (
                <tr key={paramIndex}>
                  <td className="p-2 border border-gray-300">{parameter.name}</td>
                  <td className="p-2 border border-gray-300">{parameter.type}</td>
                  <td className="p-2 border border-gray-300">{parameter.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ApiReference;
