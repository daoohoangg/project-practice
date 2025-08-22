<template>
  <section id="activity-list" class="section">
    <h3 class="section-title">活動列表</h3>
    <div class="activities">
      <div class="activity-card" 
           v-for="activity in activities" 
           :key="activity.id"
           @click="handleActivityClick(activity)">
        <div class="activity-icon">{{ activity.icon }}</div>
        <h4>{{ activity.title }}</h4>
        <p>{{ activity.description }}</p>
        <div class="activity-details">
          <span class="activity-price">{{ activity.price }}</span>
          <span class="activity-duration">{{ activity.duration }}</span>
        </div>
        <button class="activity-button">了解更多</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { Activity } from '../types/components'

const emit = defineEmits<{
  activityClick: [activity: Activity]
}>()

const activities = ref<Activity[]>([
  {
    id: 1,
    title: 'VR 高爾夫體驗',
    description: '使用最新VR技術體驗高爾夫球運動，身臨其境的虛擬實境體驗',
    icon: '🏌️',
    price: 'NT$ 800/小時',
    duration: '1-2小時'
  },
  {
    id: 2,
    title: '團體課程',
    description: '專業教練指導的團體高爾夫課程，適合初學者和進階玩家',
    icon: '👥',
    price: 'NT$ 1,200/課程',
    duration: '2-3小時'
  },
  {
    id: 3,
    title: '個人訓練',
    description: '一對一的個人化高爾夫訓練，針對個人技術提升',
    icon: '🎯',
    price: 'NT$ 1,500/課程',
    duration: '1-1.5小時'
  },
  {
    id: 4,
    title: '高爾夫裝備租借',
    description: '提供專業高爾夫球桿和裝備租借服務',
    icon: '🏌️‍♂️',
    price: 'NT$ 300/次',
    duration: '全天'
  }
])

const handleActivityClick = (activity: Activity) => {
  emit('activityClick', activity)
}
</script>

<style scoped>
.section {
  margin-bottom: 4rem;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.08);
}

.section-title {
  font-size: 2rem;
  color: #2c5530;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(45deg, #4a7c59, #6b9c7a);
  border-radius: 2px;
}

.activities {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.activity-card {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  border: 2px solid #e9ecef;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.activity-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s ease;
}

.activity-card:hover::before {
  left: 100%;
}

.activity-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  border-color: #4a7c59;
}

.activity-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.activity-card h4 {
  color: #2c5530;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.activity-card p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.activity-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 0.5rem 0;
  border-top: 1px solid #e9ecef;
  border-bottom: 1px solid #e9ecef;
}

.activity-price {
  color: #ff6b6b;
  font-weight: bold;
  font-size: 1.1rem;
}

.activity-duration {
  color: #4a7c59;
  font-size: 0.9rem;
}

.activity-button {
  background: linear-gradient(45deg, #4a7c59, #6b9c7a);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.activity-button:hover {
  background: linear-gradient(45deg, #2c5530, #4a7c59);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(74, 124, 89, 0.4);
}

/* Responsive Design */
@media (max-width: 768px) {
  .activities {
    grid-template-columns: 1fr;
  }
  
  .activity-card {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .section {
    padding: 1rem;
  }
  
  .activity-card {
    padding: 1rem;
  }
  
  .activity-details {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
