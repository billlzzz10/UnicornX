/// <reference types="react" />
"use client"


import * as React from "react"
import { useEffect, useState } from 'react'
import { apiClient } from '../../lib/api'

interface DashboardStats {
  total_projects: number
  active_projects: number
  total_tasks: number
  completed_tasks_today: number
  in_progress_tasks: number
  total_effort_points: number
  productivity_score: number
  streak_days: number
}

interface MindBiomeData {
  energy_level: number
  focus_score: number
  mood_indicator: string
  productivity_patterns: {
    peak_hours: string[]
    energy_curve: number[]
    focus_periods: string[]
  }
  recent_activities: Array<{
    type: string
    title: string
    timestamp: string
    effort_points: number
  }>
}

interface ProductivityInsight {
  insight_type: string
  title: string
  description: string
  recommendation: string
  impact_score: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [mindBiome, setMindBiome] = useState<MindBiomeData | null>(null)
  const [insights, setInsights] = useState<ProductivityInsight[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      
      // Load overview stats
      const statsResponse = await apiClient.getDashboardOverview()
      if (statsResponse.data) {
        setStats(statsResponse.data)
      } else if (statsResponse.error) {
        setError(statsResponse.error)
      }

      // Load Mind-Biome data
      const mindBiomeResponse = await apiClient.getMindBiomeData()
      if (mindBiomeResponse.data) {
        setMindBiome(mindBiomeResponse.data)
      }

      // Load insights
      const insightsResponse = await apiClient.getProductivityInsights()
      if (insightsResponse.data) {
        setInsights(insightsResponse.data)
      }

    } catch (err) {
      setError('Failed to load dashboard data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-700 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-slate-700 rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-64 bg-slate-700 rounded-lg"></div>
            <div className="h-64 bg-slate-700 rounded-lg"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-400 mb-2">เกิดข้อผิดพลาด</h2>
          <p className="text-red-300">{error}</p>
          <button 
            onClick={loadDashboardData}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
          >
            ลองใหม่
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">แดshboard</h1>
        <p className="text-slate-300">ภาพรวมการทำงานและสถิติผลิตภาพ</p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="โปรเจกต์ทั้งหมด"
            value={stats.total_projects}
            subtitle={`${stats.active_projects} กำลังใช้งาน`}
            color="blue"
          />
          <StatCard
            title="งานทั้งหมด"
            value={stats.total_tasks}
            subtitle={`${stats.completed_tasks_today} เสร็จวันนี้`}
            color="green"
          />
          <StatCard
            title="คะแนนผลิตภาพ"
            value={stats.productivity_score}
            subtitle="จาก 100 คะแนน"
            color="purple"
          />
          <StatCard
            title="พอยต์สะสม"
            value={stats.total_effort_points}
            subtitle={`${stats.streak_days} วันติดต่อกัน`}
            color="orange"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mind-Biome Card */}
        {mindBiome && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-white mb-4">Mind-Biome</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">พลังงาน</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                      style={{ width: `${mindBiome.energy_level}%` }}
                    ></div>
                  </div>
                  <span className="text-white font-medium">{Math.round(mindBiome.energy_level)}%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-slate-300">สมาธิ</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
                      style={{ width: `${mindBiome.focus_score}%` }}
                    ></div>
                  </div>
                  <span className="text-white font-medium">{Math.round(mindBiome.focus_score)}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-300">อารมณ์</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  mindBiome.mood_indicator === 'focused' ? 'bg-green-900 text-green-300' :
                  mindBiome.mood_indicator === 'scattered' ? 'bg-yellow-900 text-yellow-300' :
                  'bg-red-900 text-red-300'
                }`}>
                  {mindBiome.mood_indicator === 'focused' ? 'มีสมาธิ' :
                   mindBiome.mood_indicator === 'scattered' ? 'กระจัดกระจาย' :
                   'พลังงานต่ำ'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Insights Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-semibold text-white mb-4">ข้อมูลเชิงลึก</h3>
          <div className="space-y-4">
            {insights.length > 0 ? (
              insights.slice(0, 3).map((insight, index) => (
                <div key={index} className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-medium text-white">{insight.title}</h4>
                  <p className="text-sm text-slate-300 mt-1">{insight.description}</p>
                  <p className="text-xs text-purple-300 mt-2">{insight.recommendation}</p>
                </div>
              ))
            ) : (
              <p className="text-slate-400">ยังไม่มีข้อมูลเชิงลึก</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: number
  subtitle: string
  color: 'blue' | 'green' | 'purple' | 'orange'
}

function StatCard({ title, value, subtitle, color }: StatCardProps) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value.toLocaleString()}</p>
          <p className="text-slate-300 text-xs mt-1">{subtitle}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClasses[color]} opacity-80`}></div>
      </div>
    </div>
  )
}
