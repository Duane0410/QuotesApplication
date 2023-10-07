import React from 'react'

const Home = () => {
  return (
    <div>
        <h1>Quotes Application</h1>
        <br />
        <h2>Problem Definition</h2>

        <p>Create a simple website application that consumes API endpoints to list quotes and their authors. The application
            consists of a single entity called "Quotes" with the following fields:</p>

        <ul>
            <li><code>id</code> (UUID)</li>
            <li><code>quote</code> (string)</li>
            <li><code>author</code> (string)</li>
            <li><code>likes</code> (number)</li>
            <li><code>dislikes</code> (number)</li>
            <li><code>tags</code> (string) - A semicolon-separated string for various tags</li>
        </ul>

        <h3>API Endpoint</h3>

        <p>The API Endpoint for the application is <a href="https://quotes-vfas.onrender.com" target="_blank">https://quotes-vfas.onrender.com</a>.</p>

        <h3>API Endpoints</h3>

        <table>
            <thead>
                <tr>
                    <th>Action</th>
                    <th>End-Point</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>GET</td>
                    <td>/quote</td>
                    <td>Get all the quotes</td>
                </tr>
                <tr>
                    <td>GET</td>
                    <td>/author</td>
                    <td>Get a list of all authors</td>
                </tr>
                <tr>
                    <td>GET</td>
                    <td>/quote/search?author=martin</td>
                    <td>Search for quotes written by author "martin"</td>
                </tr>
            </tbody>
        </table>

        <h3>Task 1: Authors (Clicked)</h3>

        <p>On clicking the "Author" button, display the list of distinct authors from the quotes list.</p>

        <p>Additional Task:</p>

        <ul>
            <li>Instead of buttons, use tabs (Author & Quotes).</li>
            <li>Enhance the page header for a more appealing look.</li>
        </ul>

        <h3>Task 2: Quotes (Clicked)</h3>

        <p>Display all the quotes in the database.</p>

        <h3>Task 3: Quotes - Search</h3>

        <p>When searching by author name, display the matching authors.</p>

        <h3>Task 4: Authors - Linking to Quotes</h3>

        <p>When clicking on any author name in the list, navigate to the quotes tab and fill the search button to display
            filtered quotes by that author.</p>

        <h3>Task 5: Quote of the Day</h3>

        <p><strong>Part 1:</strong> Implement a new route <code>/quote-of-the-day</code> that randomly displays any quote
            from the available list of quotes. Add a button/menu like "Home" that displays the "Quote of the Day" route.</p>

        <p><strong>Part 2:</strong> Implement logic to display the same quote even if the user refreshes the browser page.
            However, if the user opens a new browser, the quote could be different. Also, at the end of a new day, the quote
            should be different and should not be any of the past 10 quotes displayed before.</p>

        <h3>Task 6: Add New Quotes (Optional)</h3>

        <p>Consume the POST API of quotes to add functionality for adding a new quote.</p>
    </div>
  )
}

export default Home