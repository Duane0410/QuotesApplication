# Quotes Application

## Problem Definition

Create a simple website application that consumes API endpoints to list quotes and their authors. The application consists 
of a single entity called "Quotes" with the following fields:

- `id` (UUID)
- `quote` (string)
- `author` (string)
- `likes` (number)
- `dislikes` (number)
- `tags` (string) - A semicolon-separated string for various tags

### API Endpoint

The API Endpoint for the application is [https://quotes-vfas.onrender.com](https://quotes-vfas.onrender.com).

### API Endpoints

**Quote API**

| Action | End-Point | Description |
| ------ | --------- | ----------- |
| GET    | /quote    | Get all the quotes |
| GET    | /author   | Get a list of all authors |
| GET    | /quote/search?author=martin | Search for quotes written by author "martin" |

### Task 1: Authors (Clicked)

On clicking the "Author" button, display the list of distinct authors from the quotes list.

Additional Task:
- Instead of buttons, use tabs (Author & Quotes).
- Enhance the page header for a more appealing look.

### Task 2: Quotes (Clicked)

Display all the quotes in the database.

### Task 3: Quotes - Search

When searching by author name, display the matching authors.

### Task 4: Authors - Linking to Quotes

When clicking on any author name in the list, navigate to the quotes tab and fill the search button to display filtered quotes 
by that author.

### Task 5: Quote of the Day

**Part 1:** Implement a new route `/quote-of-the-day` that randomly displays any quote from the available list of quotes. Add a 
button/menu like "Home" that displays the "Quote of the Day" route.

**Part 2:** Implement logic to display the same quote even if the user refreshes the browser page. However, if the user opens a 
new browser, the quote could be different. Also, at the end of a new day, the quote should be different and should not be any of 
the past 10 quotes displayed before.

### Task 6: Add New Quotes (Optional)

Consume the POST API of quotes to add functionality for adding a new quote.