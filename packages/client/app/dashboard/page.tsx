"use client"

import { useEffect, useState } from "react"
import ContentConnections from "./components/ContentConnections"
import CurrentState from "./components/CurrentState"
import MindBiomeVisualization from "./components/MindBiomeVisualization"
import MoodPatterns from "./components/MoodPatterns"
import TaskManagement from "./components/TaskManagement"
import TaskRecommendations from "./components/TaskRecommendations"
import { apiClient } from "../../lib/api"

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  // State for dashboard data will be managed within child components
  // or a global state manager. For now, we'll handle top-level loading.

  useEffect(() => {
    // A simple check to simulate initial data loading for the whole page
    const checkApiStatus = async () => {
      try {
        // We can use a simple endpoint like profile to check auth/api status
        const profile = await apiClient.getProfile()
        if (profile.error) {
          // Handle cases like token expiration
          setError("Could not connect to your workspace. Please try logging in again.")
        }
      } catch (e) {
        setError("Failed to load dashboard data. Please check your connection.")
      } finally {
        setLoading(false)
      }
    }
    checkApiStatus()
  }, [])

  if (loading) {
    return (
      <div className="p-4 md:p-8">
        <div className="animate-pulse">
          <div className="h-40 bg-gray-700 rounded-lg mb-6"></div>
          <div className="h-48 bg-gray-700 rounded-lg mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-96 bg-gray-700 rounded-lg"></div>
            <div className="h-96 bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 md:p-8 flex items-center justify-center h-full">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center max-w-md">
          <h2 className="text-xl font-semibold text-red-300 mb-2">เกิดข้อผิดพลาด</h2>
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    )
  }

  return (
    // The new design uses a solid color, so we'll wrap content in a div
    // to simulate the intended look within the existing structure.
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto space-y-6">
        <CurrentState />
        <TaskRecommendations />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MoodPatterns />
          <MindBiomeVisualization />
        </div>
        <TaskManagement />
        <ContentConnections />
      </div>
    </div>
  )
}
