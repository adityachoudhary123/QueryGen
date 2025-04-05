import React, { useState } from 'react';
import './QueryGen.css';

function QueryGen() {
  const [sqlType, setSqlType] = useState('');
  const [query, setQuery] = useState('');
  const [schema, setSchema] = useState('');
  const [output, setOutput] = useState('');
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const genAI = new GoogleGenerativeAI("AIzaSyCuPr-a0b997whe08f3uzgWk30KJsYdZY8");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  
  
 
 
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Simulate query processing logic

    const prompt = 'You are a database expert who provides apt SQL queries for the information requested by the user.\n'+
    'You are provided with 3 things. 1. A database type eg. MySQL, MSSQL or Postgres after the keyword `type`\n'+
    '2. A query representing the information requested by the user after the keyword `query`\n'+
    '3. The schema of the database in the form of DDL commands after the keyword `schema`\n'+
    'If the schema provided does not represent any DDL command, you should give an error response\n'+
    'You might have to join multiple tables to get the job done. Write the most efficient query to retrieve the information requested\n'+
    'For any offensive data requested, return an error response\n'+
    '`type`' + sqlType + ', \n' +
    '`query`' + query + ', \n' +
    '`schema`' + schema;

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
            placeholder="Enter the SQL query you want in plain English"
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
