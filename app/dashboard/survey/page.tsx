//import Household from '@/components/household'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, Table } from 'lucide-react'
import React from 'react'
import { InfoTooltip } from '../page'
import { cardData, householdData } from '@/lib/constants'
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Household from '@/components/household'
import Survey from '@/components/survey'

const SurveyPage = () => {
  return (
    <Survey/>
  )
}

export default SurveyPage