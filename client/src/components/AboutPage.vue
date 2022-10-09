<template>
    <div>
        <div class="h-[55px] bg-[#344953]">
            <div class="flex justify-end h-full items-center max-w-[1120px] xl:m-auto mr-20">
                <router-link to="/" class="text-[#41B883] text-xl font-semibold">Home</router-link>
            </div>
        </div>
        <div class="m-20 text-[#344953] max-w-[1120px] xl:mx-auto">
            <div class="text-2xl font-semibold mb-4">About</div>
            <div class="mt-4">
                <div class="p-5 border border-[#41B883] mb-3 rounded-lg">
                    Hi, I am Hilman Ahmad, a creator of this page. This page is created using Vue v3.2.13 with routing using
                    Vue-router v4.1.5. CRUD operation using Axios v0.27.2. CSS library using TailwindCSS v3.1.18.
                    <br>
                    Checkout my LinkedIn in
                    <a href="https://www.linkedin.com/in/muhammad-hilman-bin-ahmad-a16011185/" target="_blank"
                        class="text-[#41B883] underline">here</a>.
                </div>
            </div>
        </div>
    </div>
</template>