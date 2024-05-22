import { computed, reactive } from "vue"

export const useAuth = () => {

  const user = reactive
    ({
      "name": "John Doe",
      "imageUrl": "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      "email": "john.doe@gmail.com"
    })

  const isAuthenticated = computed(() => !!user)
  return { user, isAuthenticated }
}
