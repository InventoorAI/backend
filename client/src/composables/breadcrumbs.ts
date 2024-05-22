import { Home, Spade } from "lucide-vue-next";
import { computed } from "vue";
import { useRoute } from "vue-router"

const iconMap = {
  home: Home,
  decks: Spade,

}
export const useBreadcrumbs = () => {
  const router = useRoute();
  const links = computed(() => {
    const segments = router.fullPath.split('/').slice(1);
    const items = []
    for (let i = 0; i < segments.length; i++) {
      const href = "/" + segments.slice(0, i + 1).join('/');
      const name = segments[i];
      items.push({ href, name, icon: iconMap[name as keyof typeof iconMap] });
    }
    return items
  })
  return { links };
}
