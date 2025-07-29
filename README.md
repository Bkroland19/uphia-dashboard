# UPHIA Dashboard

A comprehensive dashboard for visualizing and analyzing Uganda Population-based HIV Impact Assessment (UPHIA) survey data from multiple MySQL databases.

## Features

### 📊 Dashboard Overview
- **Summary Statistics**: Total records across all databases
- **Data Distribution**: Pie charts showing record distribution by database type
- **Geographic Distribution**: Bar charts showing household interviews by location
- **Database Status**: Real-time status of all survey databases

### 🏠 Household Interviews
- **Filtering**: Filter by district and subcounty
- **Pagination**: Navigate through large datasets
- **Data Table**: Detailed view of household interview records
- **Export**: Export filtered data (coming soon)

### 📋 Survey Data Hub
- **Comprehensive View**: All survey data in one place
- **Advanced Filtering**: Location-based filtering
- **Real-time Data**: Live connection to MySQL databases

### 📈 Analytics & Insights
- **Trend Analysis**: Time series charts showing data collection progress
- **Quality Metrics**: Data quality indicators across databases
- **Performance Tracking**: Progress towards survey targets
- **Geographic Insights**: Location-based analytics

## Database Structure

The dashboard connects to the following MySQL databases:

- **ug_hh_int**: Household Interview data
- **ug_hh_rstr**: Household Roster data  
- **ug_hh_rstr_min**: Household Roster Minimal data
- **ug_ind_int**: Individual Interview data
- **ug_surv_data_hub**: Survey Data Hub

## Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Components**: Radix UI, Tailwind CSS
- **Charts**: Recharts
- **Database**: MySQL with mysql2 driver
- **Styling**: Tailwind CSS with custom components

## Getting Started

### Prerequisites

- Node.js 18+ 
- MySQL server with the UPHIA databases
- MySQL user with read access to the databases

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd uphia-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Configure database connection in `lib/database.ts`:
```typescript
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ug_hh_int', // default database
};
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### Dashboard Summary
- `GET /api/dashboard` - Get summary statistics for all databases

### Household Interviews
- `GET /api/household-interview` - Get household interview data with filtering
  - Query parameters: `district`, `subcounty`, `page`, `limit`

### Survey Data
- `GET /api/survey-data` - Get survey data hub records with filtering
  - Query parameters: `district`, `subcounty`, `page`, `limit`

## Database Schema

### Household Interview (ug_hh_int)
- `surveyhhint_hh_qnr` - Main questionnaire data
- `level-1` - Geographic location data
- `surveyhhint_eligibility` - Eligibility criteria
- `surveyhhint_consent` - Consent information

### Survey Data Hub (ug_surv_data_hub)
- `surveydatahub_rec` - Survey records
- `level-1` - Geographic location data

## Features in Development

- [ ] Data export functionality
- [ ] Advanced analytics with machine learning insights
- [ ] Real-time data synchronization
- [ ] User authentication and role-based access
- [ ] Mobile-responsive design improvements
- [ ] Data quality validation tools

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.
