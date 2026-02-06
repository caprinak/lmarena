
# STRATEGY Master Sim

## Business Documentation

### Project Overview

STRATEGY Master Sim is an immersive business simulation game where players take on the role of a CEO at a global footwear company, "Apex Footwear". The objective is to make strategic decisions across various business functions to outperform competitors and maximize shareholder value. The game provides a dynamic and realistic environment for players to learn and apply business concepts.

### Gameplay

The game progresses in annual turns. In each turn, the player makes decisions for the upcoming year in the following areas:

- Marketing
- Product Design
- Production
- Finance
- CSR & Ethics

After finalizing their decisions, the player ends the turn. The simulation then processes the decisions, calculates the outcomes, and presents the results in the form of financial statements, market reports, and key performance indicators. The player can then analyze the results and proceed to the next turn.

### Decision Areas

Players have control over the following key decision areas:

- **Marketing:** Set the price and advertising budget for products in four different geographical regions: North America, Europe-Africa, Asia-Pacific, and Latin America. Players can also choose to invest in celebrity endorsements to boost their brand image.

- **Product Design:** Determine the quality of the product and the number of features. Higher quality and more features can increase demand but also come at a higher cost.

- **Production:** Manage the company's production capabilities by investing in capacity expansion and automation. Players can also invest in workforce training to improve efficiency.

- **Finance:** Make critical financial decisions, such as requesting loans, issuing dividends to shareholders, and buying back company stock.

- **CSR & Ethics:** Allocate funds to Corporate Social Responsibility (CSR) initiatives, including community support, green initiatives, and ethics training. These decisions impact the company's image rating.

### Key Performance Indicators (KPIs)

The success of the player's strategy is measured by a set of Key Performance Indicators (KPIs), which are displayed on the dashboard. These include:

- **Stock Price:** The market value of the company's stock.
- **Market Share:** The percentage of the total market that the company controls.
- **Cash:** The amount of cash the company has on hand.
- **Total Revenue:** The total amount of money generated from sales.
- **Net Profit:** The company's profit after all expenses have been deducted from revenue.
- **Earnings Per Share (EPS):** The portion of a company's profit allocated to each outstanding share of common stock.
- **Return on Equity (ROE):** A measure of financial performance calculated by dividing net income by shareholders' equity.
- **Image Rating:** A score that reflects the public's perception of the company.

## Technical Documentation

### Technology Stack

- **Frontend:** React with TypeScript
- **UI Framework:** Tailwind CSS
- **UI Components:**
    - **Icons:** Lucide React
    - **Animation:** Framer Motion
- **Build Tool:** Vite

### Project Structure

The project follows a standard React application structure:

```
/
├── public/
├── src/
│   ├── components/      # React components for each decision area
│   ├── data/            # Core simulation logic and initial game state
│   │   └── simulation.ts
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── package.json
└── vite.config.ts
```

- **`src/components`**: This directory contains the React components that make up the user interface. Each component corresponds to a specific view in the application, such as the dashboard or the decision-making screens.
- **`src/data/simulation.ts`**: This is the core of the application. It contains the `simulateTurn` function, which holds the business logic for the simulation. It also defines the initial game state and the data structures used in the game.
- **`src/App.tsx`**: This is the main React component that brings all the other components together. It manages the application's state and handles the main gameplay loop.
- **`vite.config.ts`**: The configuration file for Vite, the build tool used in this project.

### Simulation Logic

The heart of the application is the `simulateTurn` function located in `src/data/simulation.ts`. This function takes the current game state and the player's decisions as input, and returns the new game state for the next turn.

The function calculates various metrics based on a set of predefined formulas. For example, unit sales are determined by a combination of base demand, price, product quality, advertising, and celebrity endorsements. The financial performance of the company is then calculated based on the revenue generated from sales and the various costs incurred.

### How to Build and Run the Project

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    This will start the Vite development server and you can view the application in your browser at `http://localhost:5173`.

3.  **Build for Production:**
    ```bash
    npm run build
    ```
    This will create a `dist` folder with the optimized production build of the application.
