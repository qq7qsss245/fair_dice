<template>
  <section class="orders-container">
    <header class="orders-tab">
      <ul>
        <li>ALL BETS</li>
      </ul>
    </header>
    <table class="orders-table">
      <thead>
        <tr>
          <th>Time</th>
          <th>Bettor</th>
          <th>Roll Under</th>
          <th>Bet</th>
          <th>Roll</th>
          <th>Payout</th>
        </tr>
      </thead>
      <tbody>
        <tr 
          :key="index"
          v-for="(order, index) in orders">
          <td>{{dateFormat(order.created_at)}}</td> 
          <td>{{order.player}}</td> 
          <td>{{order.roll_under}}</td> 
          <td>{{order.amount/10000}}</td> 
          <td>{{order.random_roll}}</td>
          <td class="payout">
            {{order.payout_value !== '0.0000 EOS' && order.payout_value/10000 || '0'}}
          </td> 
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
  import api from '@/utils/eos';

  export default {
    mounted() {
      setInterval(this.fetchOrders, 1000);
    },

    data() {
      return {
        orders: []
      };
    },

    filters: {
      formatDate:function (date) {
      var d = new Date(date);
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
      var hour = d.getHours();
      var minutes = d.getMinutes();
      var seconds = d.getSeconds();
      return year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
      }
    },

    methods: {
      fetchOrders() {  
        var roll_id = Date.now() + '' + parseInt(Math.random() * 10000);
        var current_id = localStorage.getItem("current_id");
        if (current_id > 30) {
          current_id = current_id -30
        }
        api.getTableRows({
            json: true,
            code: 'fairdicegamd',
            table: 'bets',
            limit: 30,
            lower_bound: current_id,
            index_position: 1,
            key_type: "i64",
            scope: 'fairdicegamd'
          }).then(({ rows }) => {
            this.orders = rows.reverse();
        });

      },

      dateFormat(raw) {
        var unixTimestamp = new Date(raw * 1000);
        return unixTimestamp.toLocaleString()
      },


    }
  };
</script>

<style scoped>
  .orders-container {
    background-color: #191919;
    padding: 20px;
  }   

  .orders-tab {
    color: #fff;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  .orders-tab ul {
    display: flex;
    align-items: center;
    border-bottom: 2px solid #bbb;
  }

  .orders-tab ul li {
    cursor: pointer;
    padding: 7px 35px;
    display: inline-block;
    text-align: center;
    color: #bbb; 
    letter-spacing: .5px;
    font-weight: 600;
  } 

  .orders-table {
    width: 90%;
    color: #fff;
    font-weight: 900;
    letter-spacing: .5px;
    border-collapse: collapse;
    margin: 0 auto;
  }

  .orders-table tbody tr {
    border-radius: 5px;
  }

  .orders-table tbody tr:nth-child(even) {
    background-color: #292929;
  }

  .orders-table td {
    font-size: 16px;
    padding: 20px 0;
    text-align: center;
  }

  .payout {
    color: #02f292;
    text-shadow: 0 0 5px #02f292;
  }
</style>

