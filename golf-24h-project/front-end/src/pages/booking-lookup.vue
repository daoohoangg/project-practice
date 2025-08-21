<template>
  <div class="lookup-container">
    <h3>查詢預約</h3>
    <form @submit.prevent="lookup">
      <label>電話號碼：</label>
      <input type="tel" v-model="phone" required />
      <button type="submit">查詢</button>
    </form>

    <div v-if="result" class="result">
      <h4>查詢結果</h4>
      <p>姓名: {{ result.name }}</p>
      <p>日期: {{ result.date }}</p>
      <p>時間: {{ result.time }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "BookingLookup",
  data() {
    return {
      phone: "",
      result: null,
    };
  },
  methods: {
    lookup() {
      // demo
      this.result = {
        name: "王小明",
        date: "2025-08-21",
        time: "10:00",
      };
    },
  },
};
</script>

<style scoped>
.lookup-container {
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  margin-top: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-top: 10px;
  margin-bottom: 4px;
  font-weight: bold;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

button {
  margin-top: 16px;
  padding: 10px;
  border: none;
  background: #f37021;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.result {
  margin-top: 20px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #fafafa;
}
</style>
