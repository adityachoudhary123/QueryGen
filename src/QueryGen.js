import React, { useState } from 'react';
import './QueryGen.css';

function QueryGen() {
  const [sqlType, setSqlType] = useState('');
  const [query, setQuery] = useState('');
  const [schema, setSchema] = useState('');
  const [output, setOutput] = useState('');
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const genAI = new GoogleGenerativeAI("AIzaSyBOAMVSC4E-_BOVRwdAYhEhB7qGCciPFwI");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  
 
 
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Simulate query processing logic

    const prompt = 'Write only sql query nothing else for, Database = ' + sqlType + ', and query = ' + query +  ', for Schema = ' + schema;

    const result = (await model.generateContent(prompt)).response.text();
    const refinedresult = result.replace('sql', '').replaceAll('```', '');


  
    setOutput(`${refinedresult}`);
  };

 
  return (
    <div>
      <header>
        <h1>QueryGen</h1>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <label htmlFor="sqlType">SQL Type:</label>
          <select
            id="sqlType"
            value={sqlType}
            onChange={(e) => setSqlType(e.target.value)}
          >
            <option value="">Select a SQL</option>
            <option value="MYSQL">MYSQL</option>
            <option value="MSSQL">MSSQL</option>
            <option value="Postgres">Postgres</option>
          </select>

          <label htmlFor="query">Query:</label>
          <textarea
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rows="4"
            placeholder="Enter your SQL query"
          />

          <label htmlFor="schema">Schema:</label>
          <textarea
            id="schema"
            value={schema}
            onChange={(e) => setSchema(e.target.value)}
            rows="4"
            placeholder="Enter schema details"
          />

          <button type="submit">Submit</button>

          <label htmlFor="output">Output:</label>
          <textarea
            id="output"
            value={output}
            readOnly
            rows="4"
            placeholder="Output will appear here"
          />
        </form>
      </main>
    </div>
  );
}

export default QueryGen;
