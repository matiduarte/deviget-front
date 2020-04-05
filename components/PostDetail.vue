<template>
  <div v-if="selectedPost">
    <div class="detail-card">
      <div class="title-card">
        {{ selectedPost.title }}
      </div>
      <div class="detail-card-img">
        <img
          id="detailImg"
          v-lazy="selectedPost.thumbnail"
          :alt="selectedPost.title"
          height="100%"
          width="100%"
          @click="showImage"
        >
      </div>
      <div class="detail-container">
        <div style="display: inline-flex; justify-content: center">
          <div class="author">
            {{ `Posted by ${selectedPost.author}` }}
          </div>
          <div v-if="selectedPost.hasImage" class="save-icon" title="Save to Gallery" @click="saveToGallery(selectedPost.image)">
            <img width="100%" height="100%" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAQAAABecRxxAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfkBAUWNgeMjH7SAAAVBUlEQVR42u3de5RV5XnH8R+HGQk3wRs3EcSVOGgxarBqohhB1KgLbxGrIhS1LhOMxiZqbWNqzW0FVy2JqVJXrDZgtHJJjUWjgqhEXY3mgtoo4CUgXhCtiA6iXOb0jwkwwDCcd59z9vO++/l++EPFvc959szs7+x9Lvt0Uu0M0FA1aaiatKd2VXd1V68a3jpg7xOt1FLN1b163nqU2uhUg9sYqFEapZEaZL0xQG7m6B+KEIHqArC3xmm8hllvBGBgvb6uqdZDVCtrABo0VhN1nDpbbwBg6CZdobL1ENXIEoBddI6u1WesRwci8FN9RS3WQ2QX+hu8UZdppiZoD+vBgSgM1176lfUQ2YUFYITu0wT1tB4aiMhfaoDuT/VEoPIA9NVUTVFf64GB6CR8FFBpAEZpro6qyZOGQPEkexRQSQA66zrdxoE/0IHhaSZg5wHopwc0gd/9wE4keSKwswAM0Xwdaj0kkIQETwQ6DsAwzde+1iMCyUjuRKCjAIzQPO1lPSCQlMROBHYcgIP0sHpbjwckJ6kTgR0FYD89pj2thwOSlNCJQPsB6KdHeXMvkFkyJwLtBaBBc3SI9WBA0hI5EWgvAN/TOOuxgOQlcSKwfQBG6d9Ush4LKIAEErBtAProEV70C9RI9I8FbBuAW/QF65GAAon8sYCtAzBCU3jVP1BTUZ8ItN3dG/UH/UUNbvMFLdQiLdcararr7DO0W8DSkzWvrtMgbn+n0QFLz9PkNv/VpB+poap7v0VfizUBW1yhclV/NuphTVC/3OZdETTdeOsvL0xNC/ppmbbN2mO1vsq94+Y4j623dK2LrqridtbqNt2oZdabA9TFTEl3VXUUMEmK8ShgyyZdoAGZb+U/9U29ab0pQB0VNAENm/95dcZbWKmJcT/RAdREIROwaXPGakim9Z/SWH73w4kCJmDTa/4uyLT2HB3P7g9HZuocra/qFibp1pheads6yt4alWHdOTpTH1lvAJCr2RqnDVXdwsX6STzPCLQG4PwMn/H3lM6usoVAimbqvCoTMEn/GksCNgUg1EqN1Vrr4QETBUpASdI+GT7geyLn/nCsMAkoSRnO/+/miT84V5CHA0uSRgaus1ZXWo8NmCvEw4ElSccGrvNTDv8BFeIooKQBGhy0xkbdaDkwEJHkjwJKOiBwjUf0mt24QGQSPwooaf/ANe60GhWIUtJHASUNDVq+rLk2gwLRSvgoIPQI4EWtsBgTiFqyRwEl9Qla/g/5jwgkINGjgJJ6BC2/OO8BgUTM1rlVJuDi/D+TIzQAy/MdD0hIgicCJe0atPwHeQ4HJCa5E4EGdQtanvf/o61OOkSDNVDd63gf6/W23tAzWmO9sRWZrXFVXjXoYq3P76pBDYG1aclnLCRgoK7Wmdo7p3tbq3m6KYnPdpipFt2txipuYZIa9ZV89jXzdyMhSZ31XS3RZbnt/lJXjdFcPaRB1ptegYQeDiQACNdb9+tadTW45xP0dBKfXplMAggAQjXqFzrR7N77ap6GW38JKpBIAggAQt0UfAWJ2uqq2drd+otQgSQSQAAQ5jBdYj2CButa6xEqkkACCADCfN/6GjaSpEkaaD1CRaJPAAFAiL5BH7JdP1001nqECkWeAAKAEGOi+Yk51XqAikWdgFi+nUhD+AXkiz/JzkWcAAKAEP2tB9hsD33KeoQA0SaAACBEb+sBNusU0SyViDQBBADIR5QJIABAXiJMAAEA8hNdAggAkKfIEkAAgHxFlQACAOQtogQQACB/0SSAAAAWIkkAAQBszNZ59gkgAICVWfYJqObyxUDH3tbrAUt31YHWA+dulqS7qrqC8MVSNVcQJgCon+m6KmDpg7XQemADxgngFACwZXoiQAAAa4YJIACAPbMEEAAgBkYJIABAHEwSQACAWBgkgAAA8cg9AQQAiEnOCSAAQFxyTQABAGKTYwIIABCf3BJAAIAY5ZQAAgDEKZcEEAAgVjkkgAAA8ap7AggAELM6J4AAAHGrawIIABC7OiaAAADxq1sCCACQgjolgAAAaahLAggAkIo6JIAAAOmoeQIIAJCSGieAAABpqWkCCACQmlk6XxuquoWLNaX1XwgAkJ4ZVX+4+OX6qkQAgDRVfxTwYw0jAECqqj0KaNQPCACQrmqPAsZoGAEA0lXtUcDpBABIWXVHAccTACBt1RwFDCIAQOqyHwX0JwBA+rIeBXQhAEARZHyBMAEAiiFTAggAUBQZEkAAgOKYpW+ErUAAgCJZErY4AQAcIwCAYwQAcIwAAI4RAMAxAgA4RgAAxwgA4BgBABwjAIBjBABwjAAAjhEAwDECADhGAADHCADgGAEAHCMAgGMEAHCMAACOEQDAMQIAOEYAAMcIAOAYAQAcIwCAYwQAcIwAAI41WA+AAmvS2IClB1uP6xEBQP2M0RjrEdAxTgEAxwgA4BgBABwjAIBjBABwjAAAjhEAwDECADhGAADHCADgGAFAiHXWA7TxifUARUAAEGKF9QCbrdUq6xGKgAAgxGvWA2y23HqAYiAACDHXeoDNHrYeoBgIAEI8rTetR/izX1oPUAwEACFadIP1CJKkZ/SI9QjFQAAQZqpesR5BZV2lsvUQxUAAEGadztIa4xm+o8etvwxFQQAQaqHO08eG9/8zXW/9JSgOAoBw9+lYowcDN+rvdQGH/7VDAJDFb9Ska/Rhzvc6T4fph+z+tcRVgZFNsyZrqk7SKdpPA9S7jvf0sd7SG1qge/Wy9UYXT8oBCHsteBfrcQvoA92je6yHqFDXoKUtH+PIVcqnAM1BS/ewHhemegYtnffJjZmUA/BB0NJ7Wo8LU2Hf/7BfLglLOQBh36T9rceFqc8ELR32yyVhKQcg7Jt0gPW4MDRQuwYtTwAS8KegpQ/kJMCxYwKXf9V64LykHIBFgVv6ReuBYWZk4PKLrQfOS8oBCP0mfdl6YBhpCPyU4jV6w3rkvHgKwOnqZT0yTJykvkHLL/bzasOUA7BSbwUt31V/Yz0yTFweuPxz1gPnJ+UASI8FLn9l4OvBUARHaHTgGo9aj5yftAMQ+o3qp7+1Hhk566QfBq8z33ro/KQdgPBv1Le0r/XQyNVf69jANV7S69ZD5yftALyiZYFrdNO0pN8AhTBDNCV4HVdXG0w7AMrwXrQR+p710MjJp3RPhjcqz7AeO1/loD8nWI+7jQMD52/9E/qoMFLUWTMz/GwsS/yX4glh25v2xkov6PcZ1voXjbceHHXWoNt0Vob17lSL9eh5Sj0A0rQM63TWz/RN68FRR900WxMzrTndevS8pX0KIPXS+5lOA8qazSsDC6pJz2b8mUj/A8ecnQJIqzU145pn6rcRBg3VadA39Dt9NuPa37ceP3+pHwFIfbQmY+9bjwOy/rAgNp10up6v4mfh19YbUAOBRwBFCID04yq+6WW1aI7O0C7WG4Gq7KmvVbXzl1XWidYbUQMuA9BPq6r81pf1nmbqqzq8rhe4Ru0N0Chdq/laV/VPQDFeABQYgGK8Km6Fvq2fVHkbu+msPz9ttFqr1Bx40XHkr7t6ajd1q9GtrdOl1htkoRgBkG7ReB1eo9vqxbMDDv1z4BWmCiL9ZwFategyXy/gQE0t8/j4v1ScAEhP6wfWIyBRG3WhPrIewkZxAiBdV5CHcZC3f/R0BYCtFSkALRqnFdZDIDnzNdl6BDtFCoD0tsZrvfUQSMoynauN1kPYKVYApHmayIOBqNi7+pJWWg9hqWgBkO7i3f6o0Ec6zeeTf1sULwDSzZ7P6VCxdfqynrIewloRAyBdo2usR0Dk1ug0PWg9hL1iBkCarAu1wXoIROv/NJrdXypuAKQ7dK4+th4CUXpFn9f/WA8Rh+IGQJql4fqj9RCIzi91uF6yHiIWRQ6A9IKO1M+th0BENuganaH3rMeIR7EDIDXrfF2kVdZjIAr/q89rstx88m8lih4ASbpdn9ZNvDzIuY90vYbrt9ZjxMZDAKT39HWN1PPWY8BIWTPVpH/SOutB4uMjAJK0QAfrVD1jPQZy1qI5Olxne/rAzxB+AiCV9d86QqcU4tqvqMQnmq5hGsOB/455CoAklfWAjtFgXaNXrEdBXf1OV2gfTdCL1oPErSjXBAzzmibrBo3QyRqlz6mz9TiooTX6tebrv/Sy9SBp8BkASSprgRZI6qUv6ig1aaj2U6P1UMioWUu0WH/U4/oNV4QI4TcAm6zWfbpPktSoIeqv7uqh3urJVyZ6a9WsD7VazVqu5dbDpIof8y3Wa4mWWA8B5Mnbg4AA2iAAgGMEAHCMAACOEQDAMQIAOEYAAMcIAOAYAQAcIwCAYwQAcIwAAI4RAMAxAgA4RgAAxwgA4BgBABwjAIBjBABwjAAAjhEAwDECADhGAADHCADgGAEAHCMAgGMEAHCMAACOEQDAMQIAOEYAAMcIAOAYAQAcIwCAYwQAcIwAAI4RAMAxAgA4RgAAxwgA4BgBABwjAIBjBABwjAAAjhEAwLEG6wE6mGykTtcX1E99yBSS1KKVektP6V49pg3Ww7Qv1gCM1hQNsx4CqEpJ/dRPh+pSLda3NUtl64HaGzE+XTRNc9n9USBNmqG71c16jO3FdwTQQ/N0hPUQQM39lQZrtNZYj7G12I4AOunf2f1RUEdqemx7XGTj6BKdbT0CUDdn6CLrEbYWVwC66zrrEYC6ul7drUdoK64AnKd+1iMAddVf51iP0FZcATjDegCg7k63HqCtmALQScdajwDU3UjrAdqKKQC7q6v1CEDdddfu1iNsEVMA+loPAOQioke6YgpAo/UAQC4i+kmPKQAAckYAAMcIAOAYAQAcIwCAYwQAcIwAAI4RAMAxAgA4RgAAx+K7JmDlztYq6xEASbtphvUIWaUcgAV623oEQEm/jY1TAMAxAgA4RgAAxwgA4BgBABwjAIBjBABwjAAAjhEAwDECADhGAADHCADgGAEAHCMAgGMEAHCMAACOEQDAMQIAOEYAAMcIAOAYAQAcIwCAYwQAcIwAAI4RAMAxAgA4RgAAxwgA4BgBABwjAIBjBABwjAAAjhEAwDECADhGAADHCADgGAEAHCMAgGMEAHCMAACOEQDAMQIAOEYAAMcIAOAYAQAcIwCAYwQAcIwAAI4RAMAxAgA4RgAAxwgA4BgBABwjAIBjBABwjAAAjhEAwDECADhGAADHCADgGAEAHCMAgGMEAHCMAACOEQDAMQIAOEYAAMcIAOAYAQAcIwCAYwQAcIwAAI4RAMAxAgA4RgAAxwgA4BgBABwjAIBjBABwjAAAjhEAwDECADhGAADHCADgGAEAHCMAgGMEAHCMAACOEQDAMQIAOEYAAMcIAOAYAQAcIwCAYwQAcIwAAI4RAMAxAgA4RgAAxwgA4BgBABwjAIBjBABwjAAAjhEAwDECADhGAADHCADgGAEAHCMAgGMEAHCMAACOEQDAMQIAOEYAAMcIAOAYAQAcIwCAYwQAcIwAAI4RAMAxAgA4RgAAxwgA4BgBABwjAIBjBABwjAAAjhEAwDECADhGAADHCADgGAEAHCMAgGMEAHCMAACOEQDAMQIAOEYAAMcIAOAYAQAcIwCAYwQAcIwAAI4RAMAxAgA4RgAAxwgA4BgBABwjAIBjBABwjAAAjhEAwDECADhGAADHCADgGAEAHCMAgGMEAHCMAACOEQDAMQIAOEYAAMcIAOAYAQAcIwCAYwQAcIwAAI4RAMAxAgA4RgAAxwgA4BgBABwjAIBjBABwjAAAjhEAwDECADhGAADHCADgGAEAHCMAgGMEAHCMAACOldQSuDyAeIXtoS0lfRS0Qjfr7QPQgR5BSzeX9EHQCrtabx+ADvQMWvrDkpqDVtjHevsAdGBw0NLBAWiy3j4AHQjbQz8saWXQCodabx+ADhwStPQ7JS0JWuEA9bPeQgA7MEBDg5ZfXNKioBU66UTrbQSwA18KXH5xSYsDVxlnvY0AdiB071wUegQgjQp8nBFAPobo2MA1Fpf0ppYFrdJZV1pvJ4B2XB34OsBlWlGS9Gjg3Vykva23FMA2BumCwDUeaX3lcGgAuupG620FsI0p6hK4xvzWfwxUOfjPKXXYgIMDZ+hr/RUHJEl9A39yD67DDKdm2IsHtB4BvK7ng+/uDk4DgGgM0u3B6yzUm5vePHhn8Mp7aRbvDASi0EOztEfwWm32+r21IcMBxP1qrOlmcAqANNmeAjTqVxn23g3qL206Anhj08MBQU7WA4FvPgRQW911b/Dr/yRprt6Stlw/5I5Mdz5aczXQ+isAuDVIj+nkTGv+x9b/2aBXMhxGlFXWOxpTo43hFABpsjoFOE3vZtxrX1JD601sOgLYoBsyDrGn7tNMjgOAXA3SL3Rvhof+Wk3Whm3/qotez1iTsspaq5u1b5WbxBEA0pT3EcAQTdXHVeytr2mX9m728ipusqyyNuoRXaABmTeLACBN+QVggC7UfG2sck+dtOUGO7W58Ub9XsNq8OVYpIVapOX6UO+rHLDefro16H7O1qoaTAtUazfNCFr+Er0asHQn9VZPDVKTDgm83Ef7ntVhW04AOm31v47Wgm3+BkCRlHW0ntryn1u/ffAJTbOeD0Ad3d5299d2v+/76DnOrYGCWqGD9G7bv9j2AgIrda42Wk8JoA5aNGHr3V/qvN1CS9WoY6wnBVBz39n+PYPtPeRX0sM6znpWADX1uI7b/ui+/cf8++hJfdp6XgA1s0RH653t/3pHT/oN0ZOtbxcEkLw3dZSWtvc/dnQV0T/pRF5mAxTCBzql/d1fHVxG+HmdqtXWkwOo0vs6WQt39D87ft3fMD3Itf+AhK3QSTve/XcWAGlfPaT9rbcBQCav6kS93NECO/skkaU6Ro9bbwWADB7VkR3v/u29EGhbazRdZY0I/NAhAJbKukET1byzxSp9799I/ZynBYFEvKPxeqiSBXd+BNBqqaZpLx3Mm4WByJV1h86o9MN+wnboo3WLDrLePgA79Jwm6cnKFw87s39Cn9Nlet16GwG0Y7ku1fCQ3T/0CKDVLjpH3+LJQSAiS/Uj3aqPQ1fLek7foLM0UaMrfgwBQH1s1DzdodnbX+i7EtU9qDdA52m8Pmv9FQCcelbTdVfrh3xlU4tH9fvqGI3W8Rpi/dUAnHhLT2ieHtRr1d5QLZ/W66+hatL+alJf9VAP9VAvwy8RUBSr1axmNWuFlmixluhFrajVTf8/sxS+56+qZqQAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjAtMDQtMDVUMjI6NTQ6MDcrMDA6MDCjhPVWAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIwLTA0LTA1VDIyOjU0OjA3KzAwOjAw0tlN6gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=" alt="save">
          </div>
        </div>
        <div class="comments">
          {{ `${selectedPost.comments} comments` }}
        </div>
      </div>
    </div>
    <snack-bar :message="snackMessage" :show="showSnack" />
    <modal-image :url="selectedPost.image" :visibility="showModal" @close-modal="showModal = false" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ModalImage from '~/components/ModalImage';
import SnackBar from '~/components/SnackBar';

export default {
  name: 'PostDetail',
  components: {
    ModalImage,
    SnackBar,
  },
  data() {
    return {
      showModal: false,
      showSnack: false,
      snackMessage: 'Saved to gallery',
    };
  },
  computed: {
    ...mapState(['selectedPost', 'images']),
  },
  methods: {
    ...mapActions(['saveImages']),
    showImage() {
      const { hasImage } = this.selectedPost;
      if (hasImage) {
        this.showModal = true;
      }
    },
    saveToGallery(url) {
      if (!this.images.includes(url)) {
        this.snackMessage = 'Saved to gallery';
        this.saveImages(url);
      } else {
        this.snackMessage = 'Image already exists';
      }
      this.showSnack = true;
      setTimeout(() => {
        this.showSnack = false;
      }, 2000);
    },
  },
};
</script>

<style scoped>
  .title-card {
    margin: 10px;
    font-weight: bold;
    font-size: 20px;
    line-height: 18px;
  }

  #detailImg {
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
  }

  #detailImg:hover {opacity: 0.7;}

  .detail-card {
    display: block;
    position: sticky;
    top: 70px;
    transition: 0.3s;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }
  .save-icon {
    cursor: pointer;
    width: 20px;
    height: 20px;
    margin-left: 7px;
  }
  .detail-card-img {
    width: 144px;
    height: auto;
    margin-right: auto;
    margin-left: auto;
    cursor: pointer;
  }
  .detail-container {
    margin-top: 5px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-content: center;
  }
  .author {
    font-weight: 500;
    font-size: 14px;
  }
  .comments {
    font-size: 16px;
    font-weight: bold;
    color: #447ac4;
    margin-top: auto;
    margin-bottom: 10px;
  }
</style>
