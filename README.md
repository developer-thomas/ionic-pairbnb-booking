# PairBnB 

## An Ionic project to book or offer places to rent.

## Para rodar no android studio

1 -  Build do projeto web

⚠️ Sempre obrigatório antes de rodar no Android

```ionic build```

Isso gera a pasta:
````www/```

2 - Adicionar a plataforma Android (uma vez só)

- 2.1 - Se ainda não tiver a pasta android/:
  - ```ionic capacitor add android```
  - isso cria a pasta android/

3 - Sincronizar web → Android
```ionic capacitor sync android```

4 - Abrir no Android Studio
```ionic capacitor open android``` ou `
```ionic capacitor run android -l --external```