find . -name 'node_modules' -type d -prune
for dir in services/*; do (cd "$dir" && rm -rf dist .quasar node_modules package-lock.json); done
for dir in modules/*; do (cd "$dir" && rm -rf dist .quasar node_modules package-lock.json); done
for dir in apps/*; do (cd "$dir" && rm -rf dist .quasar node_modules package-lock.json); done
for dir in modules/coins/*; do (cd "$dir" && rm -rf dist .quasar node_modules package-lock.json); done
for dir in modules/pioneer/*; do (cd "$dir" && rm -rf dist .quasar node_modules package-lock.json); done
for dir in modules/intergrations/*; do (cd "$dir" && rm -rf dist .quasar node_modules package-lock.json); done
for dir in modules/support/*; do (cd "$dir" && rm -rf dist .quasar node_modules package-lock.json); done

cd "platform" && rm -rf dist .quasar node_modules
