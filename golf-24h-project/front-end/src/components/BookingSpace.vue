<template>
  <div class="booking-space">
    <!-- Thông tin cơ bản -->
    <div class="stadium-header">
      <img :src="stadium.img" alt="stadium image" class="stadium-img" />
      <div>
        <h1>{{ stadium.name }}</h1>
        <p>{{ stadium.city }}</p>
      </div>
    </div>

    <div class="booking-layout">
      <!-- Calendar -->
      <div class="calendar-section">
        <h2>已預約資訊 Calendar</h2>
        <div class="calendar-box">
          <!-- fake calendar
          <p>2025/08/29 已被預約時間</p>
          <p class="booked">14:00 - 16:00</p> -->
        </div>
      </div>

      <!-- Booking form -->
      <div class="form-section">
        <div class="price">
          $ 700 / 小時 Hour 起
        </div>
        <label>票種 Ticket</label>
        <select v-model="ticketType">
          <option>平日打擊券</option>
          <option>假日打擊券</option>
        </select>

        <label>STEP 2 - 預約日期 Date</label>
        <DatePicker v-model="value3" size="large" placeholder="" showIcon iconDisplay="input" />

        <label>開始時間 Start</label>
        <input type="time" v-model="startTime" />

        <label>結束時間 End</label>
        <input type="time" v-model="endTime" />

        <button class="booking-btn" :disabled="loading" @click="bookNow">
          立即預約 Booking
        </button>
      </div>
    </div>

    <!-- Price Plan -->
    <div class="plan-section">
      <h2>時租定價 Plan</h2>
      <p>國定假日以假日費率計價</p>
      <table>
        <thead>
          <tr>
            <th>日期</th>
            <th>營業時間 Time</th>
            <th>價格 Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>平日 Mon - Fri</td>
            <td>07:00 - 18:00</td>
            <td>$700 / 小時</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="amenities-section">
      <h2>空間設備 Amenities</h2>
      <ul>
        <li>高爾夫球具租借</li>
        <li>更衣室</li>
        <li>免費Wi-Fi</li>
        <li>停車場</li>
      </ul>
    </div>

    <div class="recommended-activities">
      <h2>適合活動 Recommended Activities</h2>
      <ul>
        <li>企業團建</li>
        <li>生日派對</li>
        <li>友誼賽</li>
        <li>家庭聚會</li>
      </ul>
    </div>

    <div class="rules-section">
      <h2>使用規範 Rules</h2>
      <ul>
        <li>請遵守場地使用時間</li>
        <li>禁止攜帶寵物進入</li>
        <li>請保持場地清潔</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStadiumStore } from "../stores/stadiums";
const stadiumStore = useStadiumStore();
const stadium = stadiumStore.current || { name: "Golf24 圓山2店" };
import DatePicker from 'primevue/datepicker';

// Form fields
const ticketType = ref("平日打擊券");
const date = ref("");
const startTime = ref("");
const endTime = ref("");
const loading = ref(false);

async function bookNow() {
  if (!date.value || !startTime.value || !endTime.value) {
    alert("請填寫完整預約資訊");
    return;
  }
  loading.value = true;
  try {
    const startDateTime = `${date.value}T${startTime.value}:00.000Z`;
    const endDateTime = `${date.value}T${endTime.value}:00.000Z`;
    const res = await fetch("http://localhost:3000/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        stadiumId: stadium.id,
        dateTimeBooked: new Date().toISOString(),
        startTime: startDateTime,
        endTime: endDateTime,
      })
    });
    if (res.ok) {
      alert("預約成功！");
      // Optionally reset form or redirect
    } else {
      let errMsg = "未知錯誤";
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const err = await res.json();
        errMsg = err.error || errMsg;
      } else {
        errMsg = await res.text();
      }
      alert("預約失敗: " + errMsg);
    }
  } catch (e) {
    alert("預約失敗: " + e.message);
  }
  loading.value = false;
}
</script>

<style scoped>
.booking-space {
  max-width: 1000px;
  margin: 0 auto;
}
.booking-space {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.stadium-header {
  display: flex;
  align-items: center;
  gap: 15px;
}

.stadium-img {
  width: 80px;
  height: 80px;
  border-radius: 10px;
}

.booking-layout {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.calendar-section,
.form-section {
  flex: 1;
  background: #fff;
  border: 1px solid #eee;
  padding: 15px;
  border-radius: 12px;
}

.form-section .price {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.form-section label {
  display: block;
  margin-top: 10px;
}

.form-section input,
.form-section select {
  width: 100%;
  padding: 6px;
  margin-top: 4px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.booking-btn {
  margin-top: 15px;
  width: 100%;
  background: #f77b2d;
  color: white;
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.booking-btn:hover {
  background: #e56a1d;
}

.plan-section {
  margin-top: 30px;
}

.plan-section table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.plan-section th,
.plan-section td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}
.booked {
  color: red;
  font-weight: bold;
}
.p-datepicker {
  border: 1px solid #b9b9b9;  
  background-color: #f9fafb;   
  border-radius: 5px;         
}

.p-datepicker .p-datepicker-header {
  background-color: #3b82f6;
  color: white;
  border-radius: 2px 2px 0 0;
}

.p-datepicker td > span:hover {
  background-color: #dbeafe;
  border-radius: 2px;
}

.p-datepicker td.p-highlight > span {
  background-color: #3b82f6 !important;
  color: white !important;
  border-radius: 6px;
}
</style>
