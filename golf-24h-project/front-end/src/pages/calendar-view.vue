<template>
    <div class="calendar-container">
        <div class="calendar-header">
            <button @click="prevMonth">‹</button>
            <span>{{ currentYear }} 年 {{ currentMonth + 1 }} 月</span>
            <button @click="nextMonth">›</button>
        </div>

        <div class="calendar-grid">
            <div class="day-label" v-for="day in weekDays" :key="day">{{ day }}</div>

            <div v-for="(date, index) in daysInMonth" :key="index" class="calendar-day"
                :class="{ 'disabled': !date, 'selected': isSelected(date), 'past': isPast(date) }" @click="selectDate(date)">
                <span v-if="date">{{ date.getDate() }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CalendarView",
    data() {
        const today = new Date();
        return {
            currentYear: today.getFullYear(),
            currentMonth: today.getMonth(),
            selectedDate: today,
            weekDays: ["週日", "週一", "週二", "週三", "週四", "週五", "週六"],
        };
    },
    computed: {
        daysInMonth() {
            const firstDay = new Date(this.currentYear, this.currentMonth, 1);
            const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);

            let days = [];
            for (let i = 0; i < firstDay.getDay(); i++) {
                days.push(null); // empty slot
            }
            for (let d = 1; d <= lastDay.getDate(); d++) {
                days.push(new Date(this.currentYear, this.currentMonth, d));
            }
            return days;
        },
    },
    methods: {
        prevMonth() {
            if (this.currentMonth === 0) {
                this.currentYear--;
                this.currentMonth = 11;
            } else {
                this.currentMonth--;
            }
        },
        nextMonth() {
            if (this.currentMonth === 11) {
                this.currentYear++;
                this.currentMonth = 0;
            } else {
                this.currentMonth++;
            }
        },
        selectDate(date) {
            if (date) this.selectedDate = date;
            this.$emit("date-selected", this.selectedDate);
        },
        isSelected(date) {
            return (
                date &&
                this.selectedDate &&
                date.toDateString() === this.selectedDate.toDateString()
            );
        },
        isPast(date) {
            if (!date) return false;
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date < today;
        }
    },
};
</script>

<style scoped>
.calendar-container {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    padding: 16px;
    width: 350px;
}

.calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f37021;
    color: white;
    padding: 10px;
    border-radius: 6px 6px 0 0;
    font-weight: bold;
}

.calendar-header button {
    border: none;
    background: transparent;
    color: white;
    font-size: 18px;
    cursor: pointer;
}

.calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 6px;
    margin-top: 12px;
}

.day-label {
    text-align: center;
    font-weight: bold;
    color: #666;
}

.calendar-day {
    text-align: center;
    padding: 8px;
    border-radius: 6px;
    cursor: pointer;
}

.calendar-day.disabled {
    color: #ccc;
    pointer-events: none;
}

.calendar-day.selected {
    background: #f37021;
    color: white;
    font-weight: bold;
}
.calendar-day.past {
  color: #aaa;              
  background: #f5f5f5;      
  cursor: not-allowed;
}
</style>
